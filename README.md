# React Native Image Cache on File System with Progressive Loading

[![npm version](https://badge.fury.io/js/%40georstat%2Freact-native-image-cache.svg)](https://badge.fury.io/js/%40georstat%2Freact-native-image-cache)

Inspired by:

- [wcandillon/react-native-expo-image-cache](https://github.com/wcandillon/react-native-expo-image-cache) (William Candillon)
- [WrathChaos/react-native-progressive-fast-image](https://github.com/WrathChaos/react-native-progressive-fast-image) (FreakyCoder)

## Features

- Cache remote images in file system with progressive loading
- Uses [`react-native-file-access`](https://github.com/alpha0010/react-native-file-access) for file system access
- Written in `Typescript`

## Preview

### iOS:

![@georstat:react-native-image-cache_iOS_demo](https://user-images.githubusercontent.com/717975/117460761-85fd8f00-af55-11eb-8804-69c008bfeb8d.gif)

### Android:

![@georstat:react-native-image-cache_Android_demo](https://user-images.githubusercontent.com/717975/117491773-4ba5e900-af79-11eb-8ae1-99604b47c55c.gif)

## Installation

#### yarn:

```
yarn add @georstat/react-native-image-cache
```

#### npm:

```
npm i @georstat/react-native-image-cache
```



## Usage

#### Put this Global config on your app entry eg. `App.tsx` or `index.js` (**Required**):

```tsx
import { CacheManager } from '@georstat/react-native-image-cache';
import {Dirs} from 'react-native-file-access';

CacheManager.config = {
  sourceAnimationDuration: 1000,
  thumbnailAnimationDuration: 1000,
  BASE_DIR: `${Dirs.CacheDir}/images_cache/`,
};
```

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

#### Clear local cache:

```tsx
import { CacheManager } from '@georstat/react-native-image-cache';

await CacheManager.clearCache();
```

#### Get local cache size:

```tsx
await CacheManager.getCacheSize();
```

## Props

#### `CachedImage` accepts the following props:

| Properties                   | PropType     | Description                                                                              |
| ---------------------------- | ------------ | ---------------------------------------------------------------------------------------- |
| `source`                     | `String`     | (**Required**) Uri of remote image.                                                      |
| `sourceAnimationDuration`    | `Number`     | `source` image animation duration when loading, defaults to `1000`ms (overrides config) |
| `thumbnailSource`            | `String`     | (**Required**) Uri of the thumbnail image                                                |
| `thumbnailAnimationDuration` | `Number`     | Animation duration for thumbnail, defaults to `1000`ms (overrides config)               |
| `loadingImageComponent`      | `React.Node` | Defaults to an image with the `loadingSource` prop                                         |
| `loadingImageStyle`          | `Object`     | Style for loading image component. Works if you don't provide a `loadingImageComponent`    |
| `loadingSource`              | `object`     | Source for loading Image component. Works if you don't provide `loadingImageComponent`     |
| `onError`                    | `Func`       | Runs when there is an error loading the image from cache                                 |
| `resizeMode`                 | `String`     | React native Image component [resizeMode](https://reactnative.dev/docs/image#resizemode) defaults to `contain` |
| `style`                      | `Object`     | `source` AND `thumbnailSource` image style                                                                     |
| `options`                    | `Object`     | custom options for the fetch image http request eg. `{headers:{}, body:{}}`             |

## Todo:

- ~~Convert library to React Hooks~~
- ~~Make `BASE_DIR` configurable~~
- Delete single cache entry

## Authors:

- [Efstathios Ntonas](https://github.com/efstathiosntonas)
- [George Bakogiannis](https://github.com/geobako)
- [George Kallinikos](https://github.com/giokallis)
