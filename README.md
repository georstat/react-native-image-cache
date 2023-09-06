# React Native Image Cache on File System with Progressive Loading

[![npm version](https://img.shields.io/npm/v/@georstat/react-native-image-cache.svg?style=for-the-badge)](https://www.npmjs.com/package/@georstat/react-native-image-cache)
[![npm downloads](https://img.shields.io/npm/dm/@georstat/react-native-image-cache.svg?style=for-the-badge)](https://www.npmjs.com/package/@georstat/react-native-image-cache)
[![npm](https://img.shields.io/npm/dt/@georstat/react-native-image-cache.svg?style=for-the-badge)](https://www.npmjs.com/package/@georstat/react-native-image-cache)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
![GitHub package.json version](https://img.shields.io/github/package-json/v/georstat/react-native-image-cache?style=for-the-badge)
![Platform - Android and iOS](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue.svg?style=for-the-badge)

Inspired by:

- [wcandillon/react-native-expo-image-cache](https://github.com/wcandillon/react-native-expo-image-cache) (William Candillon)
- [WrathChaos/react-native-progressive-fast-image](https://github.com/WrathChaos/react-native-progressive-fast-image) (FreakyCoder)

## Features

- Cache **remote** images in file system with progressive loading
- Can be used with local images
- Uses [`react-native-file-access`](https://github.com/alpha0010/react-native-file-access) for file system access
- Written in `Typescript`
- Uses [`react-native-reanimated`](https://docs.swmansion.com/react-native-reanimated/docs/) for animations
- Retry on network failure
- Supports new Architecture, both `react-native-file-access` and `react-native-reanimated` are Fabric ready.

## <span style="color:red;font-size: 26px;font-weight:bold;">Caution:</span>

#### If you're not using [`react-native-reanimated`](https://github.com/software-mansion/react-native-reanimated) version 2.x.x then use version 1.x.x of this module

### If you're looking for an image library with thumbnails visit [@georstat/react-native-image-gallery](https://github.com/georstat/react-native-image-gallery)

## Preview

### iOS:

![@georstat:react-native-image-cache_iOS_demo](https://user-images.githubusercontent.com/717975/117460761-85fd8f00-af55-11eb-8804-69c008bfeb8d.gif)

### Android:

![@georstat:react-native-image-cache_Android_demo](https://user-images.githubusercontent.com/717975/117491773-4ba5e900-af79-11eb-8ae1-99604b47c55c.gif)

### Custom Loading Image Component: (see [example](https://github.com/georstat/react-native-image-cache/tree/main/example/src))

![@georstat:react-native-image-cache_custom_loading_image_component_demo](https://user-images.githubusercontent.com/717975/125193571-b4e5f900-e255-11eb-8164-3ca097ce6e74.gif)

## Installation

#### yarn:

```bash
yarn add @georstat/react-native-image-cache react-native-file-access react-native-reanimated
```

#### npm:

```bash
npm i @georstat/react-native-image-cache react-native-file-access react-native-reanimated
```

#### link native packages:

```bash
 cd ios
 pod install
```

### \*\*note!

For react native >= 0.65 use [`react-native-file-access`](https://github.com/alpha0010/react-native-file-access) >= 2.0.0

## Usage

#### Put this Global config on your app entry eg. `App.tsx` or `index.js` (**Required**):

**_Note_**: `retryDelay` and `maxRetries` are optional, they default to `0` which means retry logic is **disabled**

```tsx
import { CacheManager } from '@georstat/react-native-image-cache';
import { Dirs } from 'react-native-file-access';

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 15,
  cacheLimit: 0,
  maxRetries: 3 /* optional, if not provided defaults to 0 */,
  retryDelay: 3000 /* in milliseconds, optional, if not provided defaults to 0 */,
  sourceAnimationDuration: 1000,
  thumbnailAnimationDuration: 1000,
};
```

#### Custom cache key, useful for caching images from Amazon's S3 and similar services, add this (or whatever suits your needs) on `CacheManager.config`:

```tsx
CacheManager.config = {
  // ...
  getCustomCacheKey: (source: string) => {
    // Remove params from the URL for caching images (useful for caching images from Amazons S3 bucket and etc)
    let newCacheKey = source;
    if (source.includes('?')) {
      newCacheKey = source.substring(0, source.lastIndexOf('?'));
    }
    return newCacheKey;
  },
};
```

#### `cacheLimit` config: (auto pruning of cached files)

If `cacheLimit` is set to `0` (default value) then the cache will never be auto pruned. This setting accepts a number of Bytes eg. `1024 * 1024 * 256`(~256MB) and requires `react-native-file-access` >= 2.4.0, if you're using < 2.4.0 then leave the default value `0` (disabled).

Cache pruning flow:

1. Get all files from `baseDir`.
2. Sort them by `lastModified`, oldest first.
3. Get total size in Bytes by using `reduce` array method.
4. Check total size from step 3 and subtract `cacheLimit` value.
5. Run a while loop and keep deleting files so long as the current cache size (step 4) is larger than the size required to trigger cache pruning (`cacheLimit` value).
6. All steps above will run only if the image is not already cached, it runs after downloading a new image into the cache.

Pruning has been benchmarked on iOS simulator with a 5.7MB image and ~5.000 copies of it on cache without any issues. Please note that the pruning speed/performance might differ among devices. Use `cacheLimit` wisely and do not set a big value.

If you want to run your own tests on simulator then the cached images are stored in this location on a Mac:
`/Users/<your_name>/Library/Developer/CoreSimulator/Devices/<simulator_device_id>/ data/Containers/Data/Application/<application_id>/Library/Caches/images_cache`,
just copy and paste multiple images in there, there's no need to download them via the app.

#### Directory constants, choose wisely: ([react-native-file-access docs](https://github.com/alpha0010/react-native-file-access#directory-constants))

- `Dirs.CacheDir`
- `Dirs.DatabaseDir` (Android only)
- `Dirs.DocumentDir`
- `Dirs.LibraryDir` (iOS only)
- `Dirs.MainBundleDir`
- `Dirs.SDCardDir` (Android only)
  - Prefer `FileSystem.cpExternal()` when possible.

#### Component:

```tsx
import { CachedImage } from '@georstat/react-native-image-cache';

<CachedImage
  source="https://via.placeholder.com/3500x3500"
  style={{ height: 350, width: 150 }}
  thumbnailSource="https://via.placeholder.com/350x150"
/>;
```

#### Prefetch Image(s) and store them in cache:

Accepts 2 parameters:

| Parameter | Type              | Description                                                                            |
|-----------|-------------------|----------------------------------------------------------------------------------------|
| `image`   | `Array or String` | (Required) uri of remote image or array of remote uri strings                          |
| `options` | `Object`          | (Optional) custom options for the fetch image http request eg. `{headers:{}, body:{}}` |

```tsx
import { CacheManager } from '@georstat/react-native-image-cache';

const url = 'https://..../image.jpg';

const urls = [
  'https://..../image.jpg',
  'https://..../image2.jpg',
  'https://..../image3.jpg',
];

CacheManager.prefetch(url); // prefetch single image

CacheManager.prefetch(urls); // prefetch mutliple images
```

#### Prefetch Image and return blob/base64:

Accepts 2 parameters:

| Parameter | Type     | Description                                                                            |
|-----------|----------|----------------------------------------------------------------------------------------|
| `image`   | `String` | (Required) uri of remote image                                                         |
| `options` | `Object` | (Optional) custom options for the fetch image http request eg. `{headers:{}, body:{}}` |

```tsx
import { CacheManager } from '@georstat/react-native-image-cache';

const url = 'https://..../image.jpg';

CacheManager.prefetchBlob(url).then(response => console.log(response)); // response is the base64 string
```

#### Clear local cache:

```tsx
import { CacheManager } from '@georstat/react-native-image-cache';

await CacheManager.clearCache();
```

#### Remove single cache entry:

```tsx
const uri = 'https://.../example.jpg';

await CacheManager.removeCacheEntry(uri);
```

#### Get local cache size:

```tsx
await CacheManager.getCacheSize();
```

#### Check if image is cached:

```tsx
await CacheManager.isImageCached(uri);
```

## Props

#### `CachedImage` accepts the following props:

| Properties                       | PropType             | Description                                                                                                                                                                                                    |
|----------------------------------|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `source`                         | `String`             | (**Required**) Uri of image.                                                                                                                                                                                   |
| `sourceAnimationDuration`        | `Number`             | `source` image animation duration when loading, defaults to `1000`ms (overrides config)                                                                                                                        |
| `thumbnailSource`                | `String`             | (**Required**) Uri of the thumbnail image                                                                                                                                                                      |
| `thumbnailAnimationDuration`     | `Number`             | Animation duration for thumbnail, defaults to `1000`ms (overrides config)                                                                                                                                      |
| `blurRadius`                     | `Number`             | Amount of blur to apply on `thumbnailSource` image , defaults to `15` (overrides config)                                                                                                                       |
| `loadingImageComponent`          | `React.CompnentType` | Defaults to an image with the `loadingSource` prop                                                                                                                                                             |
| `noCache`                        | `Boolean`            | Do not cache the image, defaults to `false` which means always cache the image                                                                                                                                 |
| `maxAge`                         | `Number`             | Maximum age in hours to cache the image, defaults to `undefined` (infinite caching). **Auto pruning won't take into consideration this value, it will delete the image anyway if the `cacheLimit` is reached** |
| `loadingImageStyle`              | `Object`             | Style for loading image component. Works if you don't provide a `loadingImageComponent`                                                                                                                        |
| `imageStyle`                     | `Object`             | Image style, use it when loading local images via `require()`                                                                                                                                                  |
| `loadingSource`                  | `object`             | Source for loading Image component. Works if you don't provide `loadingImageComponent`                                                                                                                         |
| `onError`                        | `Func`               | Runs when there is an error loading the image from cache                                                                                                                                                       |
| `onLoad`                         | `Func`               | Invoked when load completes successfully                                                                                                                                                                       |
| `onLoadEnd`                      | `Func`               | Invoked when load either succeeds or fails                                                                                                                                                                     |
| `resizeMode`                     | `String`             | React native Image component [resizeMode](https://reactnative.dev/docs/image#resizemode) defaults to `contain`                                                                                                 |
| `testID`                         | `String`             | testID, useful for tests                                                                                                                                                                                       |
| `tintColor`                      | `String`             | tintColor of the source image                                                                                                                                                                                  |
| `style`                          | `Object`             | `source` AND `thumbnailSource` image style                                                                                                                                                                     |
| `options`                        | `Object`             | custom options for the fetch image http request eg. `{headers:{}, body:{}}`                                                                                                                                    |
| `accessibilityHint`              | `string`             | accessibility hint for `source` (optional)                                                                                                                                                                     |
| `accessibilityLabel`             | `string`             | accessibility label for `source` (optional)                                                                                                                                                                    |
| `accessibilityRole`              | `string`             | accessibility role for `source` (optional, defaults to `image`)                                                                                                                                                |
| `accessibilityHintThumbnail`     | `string`             | accessibility hint for `thumbnailSource` (optional)                                                                                                                                                            |
| `accessibilityLabelThumbnail`    | `string`             | accessibility label for `thumbnailSource` (optional)                                                                                                                                                           |
| `accessibilityRoleThumbnail`     | `string`             | accessibility role for `thumbnailSource` (optional, defaults to `image`)                                                                                                                                       |
| `accessibilityHintLoadingImage`  | `string`             | accessibility hint for `loadingSource` (optional)                                                                                                                                                              |
| `accessibilityLabelLoadingImage` | `string`             | accessibility label for `loadingSource` (optional)                                                                                                                                                             |
| `accessibilityRoleLoadingImage`  | `string`             | accessibility role for `loadingSource` (optional, defaults to `image`)                                                                                                                                         |

#### [More info about React Native Accessibility](https://reactnative.dev/docs/accessibility)

#### [Blog Article about React Native Accessibility](https://medium.com/reactbrasil/introducing-react-native-accessibility-engine-fcf78f2a3805)

## Todo:

- [x] Convert library to React Hooks
- [x] Make `baseDir` configurable
- [x] Delete single cache entry

# Sponsor

This library is developed for free.

Buy us a coffee using this link: [!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/efstathios)

## Authors:

- [Efstathios Ntonas](https://github.com/efstathiosntonas)
- [George Bakogiannis](https://github.com/geobako)
- [George Kallinikos](https://github.com/giokallis)
