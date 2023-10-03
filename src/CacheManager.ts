import SHA1 from 'crypto-js/sha1';
import { v4 as uniqueId } from 'uuid';
import { FileStat, FileSystem } from 'react-native-file-access';

import { Config, DownloadOptions } from './types';
import defaultConfiguration from './defaultConfiguration';
import FastImage from 'react-native-fast-image';

// Blow away FastImage cache so that updated assets are loaded.
// (We could blow away FastImage at any time since we use FileSystem for the actual caching)
// TODO: figure out how to prevent FastImage from caching at all.
FastImage.clearDiskCache();
FastImage.clearMemoryCache();

interface CacheEntryItem {
  exists: boolean;
  path: string;
  tmpPath: string;
}

export class CacheEntry {
  source: string;

  options: DownloadOptions | undefined;

  downloadPromise: Promise<string | undefined> | undefined;

  noCache: boolean | undefined = false;

  maxAge: number | undefined;

  constructor(
    source: string,
    options: DownloadOptions | undefined,
    noCache?: boolean,
    maxAge?: number
  ) {
    this.noCache = noCache;
    this.options = options;
    this.source = source;
    this.maxAge = maxAge;
  }

  async getPath(): Promise<string | undefined> {
    const { source, maxAge, noCache } = this;
    const { exists, path, tmpPath } = await getCacheEntry(source, maxAge);

    if (exists && !noCache) {
      try {
        const { lastModified } = await FileSystem.stat(path);
        const ageInSeconds = (Date.now() - lastModified) / 1000;
        const ageInHours = ageInSeconds / (60 * 60);
        // Download fresh images every day
        if (ageInHours > CacheManager.config.refreshIntervalHours) {
          // Skip fresh download if one is already in flight
          if (!this.downloadPromise) {
            this.downloadPromise = this.download(path, tmpPath);
          }
        }
      } catch (err) {
        // error logging
      }

      return path;
    }

    if (!this.downloadPromise) {
      this.downloadPromise = this.download(path, tmpPath);
    }

    try {
      await this.downloadPromise;
    } catch (err) {
      // noop if file now exists
      const exists = await FileSystem.exists(path);
      if (!exists) throw err;
    }

    return path;
  }

  private async download(path: string, tmpPath: string): Promise<string> {
    const { source, options, noCache } = this;
    try {
      // if noCache is true then return the source uri without caching it
      if (noCache) {
        return source;
      }

      const result = await FileSystem.fetch(source, {
        path: tmpPath,
        ...options,
      });
      // If the image download failed, we don't cache anything
      if (result && result.status !== 200) {
        throw new Error(
          `Image download failed with status: ${result.status}, ${source}`
        );
      }

      // This mv may throw if we download many copies of the same image.
      // (eg. feed downloads may copies of a pfp chip)
      await FileSystem.mv(tmpPath, path);
      if (CacheManager.config.cacheLimit) {
        await CacheManager.pruneCache();
      }
      return path;
    } catch (err) {
      // disabled for now, nothing actionable
      // appException('CacheManager: download', err, { source, path })
      throw err;
    } finally {
      this.downloadPromise = undefined;
    }
  }
}

export default class CacheManager {
  static defaultConfig: Config = defaultConfiguration;

  static config: Config;

  get config() {
    return CacheManager.defaultConfig;
  }

  set config(newConfig) {
    CacheManager.defaultConfig = newConfig;
  }

  static entries: { [uri: string]: CacheEntry } = {};

  static get(
    source: string,
    options: DownloadOptions | undefined,
    noCache?: boolean,
    maxAge?: number
  ): CacheEntry {
    if (!CacheManager.entries[source]) {
      CacheManager.entries[source] = new CacheEntry(
        source,
        options,
        noCache,
        maxAge
      );
      return CacheManager.entries[source];
    }
    return CacheManager.entries[source];
  }

  static async clearCache(): Promise<void> {
    const files = await FileSystem.ls(CacheManager.config.baseDir);
    for (const file of files) {
      try {
        await FileSystem.unlink(`${CacheManager.config.baseDir}${file}`);
      } catch (e) {
        console.log(`error while clearing images cache, error: ${e}`);
      }
    }
  }

  static async removeCacheEntry(entry: string): Promise<void> {
    try {
      FastImage.clearDiskCache();
      FastImage.clearMemoryCache();
      const file = await getCacheEntry(entry);
      const { path } = file;
      await FileSystem.unlink(path);
    } catch (e) {
      throw new Error('error while clearing image from cache');
    }
  }

  static async getCacheSize(): Promise<number> {
    const result = await FileSystem.stat(CacheManager.config.baseDir);
    if (!result) {
      throw new Error(`${CacheManager.config.baseDir} not found`);
    }
    return result.size;
  }

  static async isImageCached(entry: string): Promise<boolean> {
    try {
      const file = await getCacheEntry(entry);
      const { exists } = file;
      return exists;
    } catch (e) {
      throw new Error('Error while checking if image already exists on cache');
    }
  }

  static prefetch(source: string | string[], options?: DownloadOptions): void {
    if (typeof source === 'string') {
      CacheManager.get(source, options).getPath();
    } else {
      source.map(image => {
        CacheManager.get(image, options).getPath();
      });
    }
  }

  static async pruneCache() {
    // If cache directory does not exist yet there's no need for pruning.
    if (!(await CacheManager.getCacheSize())) {
      return;
    }

    const files = await FileSystem.statDir(CacheManager.config.baseDir);

    files.sort((a: FileStat, b: FileStat) => {
      return a.lastModified - b.lastModified;
    });

    const currentCacheSize = files.reduce((cacheSize, file: FileStat) => {
      return cacheSize + file.size;
    }, 0);

    if (currentCacheSize > CacheManager.config.cacheLimit) {
      let overflowSize = currentCacheSize - CacheManager.config.cacheLimit;

      while (overflowSize > 0 && files.length) {
        const file = files.shift();
        if (file) {
          if (await FileSystem.exists(file.path)) {
            overflowSize = overflowSize - file.size;
            await FileSystem.unlink(file.path).catch(e => console.log(e));
          }
        }
      }
    }
  }
}

const getCacheEntry = async (
  cacheKey: string,
  maxAge?: number | undefined
): Promise<CacheEntryItem> => {
  let newCacheKey = cacheKey;
  if (CacheManager.config.getCustomCacheKey) {
    newCacheKey = CacheManager.config.getCustomCacheKey(cacheKey);
  }
  const filename = cacheKey.substring(
    cacheKey.lastIndexOf('/'),
    cacheKey.indexOf('?') === -1 ? cacheKey.length : cacheKey.indexOf('?')
  );
  const ext =
    filename.indexOf('.') === -1
      ? '.webp'
      : filename.substring(filename.lastIndexOf('.'));
  const sha = SHA1(newCacheKey);
  const path = `${CacheManager.config.baseDir}${sha}${ext}`;
  const tmpPath = `${CacheManager.config.baseDir}${sha}-${uniqueId()}${ext}`;
  let exists = false;

  try {
    const cacheDirExists = await FileSystem.exists(CacheManager.config.baseDir);
    if (!cacheDirExists) {
      await FileSystem.mkdir(CacheManager.config.baseDir);
    }
    exists = await FileSystem.exists(path);
    if (maxAge && exists) {
      const { lastModified } = await FileSystem.stat(path);
      const ageInHours = Math.floor(Date.now() - lastModified) / 1000 / 3600;
      if (maxAge < ageInHours) {
        await FileSystem.unlink(path);
        return { exists: false, path, tmpPath };
      }
    }
  } catch (err) {
    // disabled for now, nothing actionable
  }
  return { exists, path, tmpPath };
};
