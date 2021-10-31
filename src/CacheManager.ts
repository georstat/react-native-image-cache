// @ts-ignore
import SHA1 from 'crypto-js/sha1';
import uniqueId from 'lodash/uniqueId';
import { FileSystem } from 'react-native-file-access';

import { Config, DownloadOptions } from './types';
import defaultConfiguration from './defaultConfiguration';

export class CacheEntry {
  source: string;

  options: DownloadOptions;

  cacheKey: string;

  downloadPromise: Promise<string | undefined> | undefined;

  pathResolved = false;

  constructor(source: string, options: DownloadOptions, cacheKey: string) {
    this.source = source;
    this.options = options;
    this.cacheKey = cacheKey;
  }

  async getPath(): Promise<string | undefined> {
    const { cacheKey } = this;
    const { path, exists, tmpPath } = await getCacheEntry(cacheKey);
    if (exists) {
      return path;
    }

    if (!this.downloadPromise) {
      this.pathResolved = false;
      this.downloadPromise = this.download(path, tmpPath);
    }

    if (this.downloadPromise && this.pathResolved) {
      this.pathResolved = false;
      this.downloadPromise = this.download(path, tmpPath);
    }
    return this.downloadPromise;
  }

  private async download(
    path: string,
    tmpPath: string
  ): Promise<string | undefined> {
    const { source, options } = this;
    if (source != null) {
      const result = await FileSystem.fetch(source, {
        path: tmpPath,
        ...options,
      });
      // If the image download failed, we don't cache anything
      if (result && result.status !== 200) {
        this.downloadPromise = undefined;
        return undefined;
      }
      await FileSystem.mv(tmpPath, path);
      this.pathResolved = true;
      return path;
    }
    return source;
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
    options: DownloadOptions,
    cacheKey: string
  ): CacheEntry {
    if (!CacheManager.entries[cacheKey]) {
      CacheManager.entries[cacheKey] = new CacheEntry(
        source,
        options,
        cacheKey
      );
      return CacheManager.entries[cacheKey];
    }
    return CacheManager.entries[cacheKey];
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
      throw new Error('Error while checking if file already exists on cache');
    }
  }
}

const getCacheEntry = async (
  cacheKey: string
): Promise<{ exists: boolean; path: string; tmpPath: string }> => {
  const filename = cacheKey.substring(
    cacheKey.lastIndexOf('/'),
    cacheKey.indexOf('?') === -1 ? cacheKey.length : cacheKey.indexOf('?')
  );
  const ext =
    filename.indexOf('.') === -1
      ? '.jpg'
      : filename.substring(filename.lastIndexOf('.'));
  const sha = SHA1(cacheKey);
  const path = `${CacheManager.config.baseDir}${sha}${ext}`;
  const tmpPath = `${CacheManager.config.baseDir}${sha}-${uniqueId()}${ext}`;
  // TODO: maybe we don't have to do this every time
  try {
    await FileSystem.mkdir(CacheManager.config.baseDir);
  } catch (e) {
    // do nothing
  }
  const exists = await FileSystem.exists(path);
  return { exists, path, tmpPath };
};
