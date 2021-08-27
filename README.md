# React Native Image Cache on File System with Progressive Loading

[![npm version](https://img.shields.io/npm/v/@georstat/react-native-image-cache.svg?style=for-the-badge)](https://www.npmjs.com/package/@georstat/react-native-image-cache)
[![npm](https://img.shields.io/npm/dt/@georstat/react-native-image-cache.svg?style=for-the-badge)](https://www.npmjs.com/package/@georstat/react-native-image-cache)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
![GitHub package.json version](https://img.shields.io/github/package-json/v/georstat/react-native-image-cache?style=for-the-badge)
![Platform - Android and iOS](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue.svg?style=for-the-badge)

Inspired by:

- [wcandillon/react-native-expo-image-cache](https://github.com/wcandillon/react-native-expo-image-cache) (William Candillon)
- [WrathChaos/react-native-progressive-fast-image](https://github.com/WrathChaos/react-native-progressive-fast-image) (FreakyCoder)

## Features

- Cache **remote** images in file system with progressive loading
- Uses [`react-native-file-access`](https://github.com/alpha0010/react-native-file-access) for file system access
- Written in `Typescript`

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
yarn add @georstat/react-native-image-cache
```

#### npm:

```bash
npm i @georstat/react-native-image-cache
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

```tsx
import { CacheManager } from '@georstat/react-native-image-cache';
import { Dirs } from 'react-native-file-access';

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 15,
  sourceAnimationDuration: 1000,
  thumbnailAnimationDuration: 1000,
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

#### Remove single cache entry:

```tsx
const uri = 'https://.../example.jpg';

await CacheManager.removeCacheEntry(uri);
```

#### Get local cache size:

```tsx
await CacheManager.getCacheSize();
```

## Props

#### `CachedImage` accepts the following props:

| Properties                       | PropType             | Description                                                                                                    |
| -------------------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------- |
| `source`                         | `String`             | (**Required**) Uri of remote image.                                                                            |
| `sourceAnimationDuration`        | `Number`             | `source` image animation duration when loading, defaults to `1000`ms (overrides config)                        |
| `thumbnailSource`                | `String`             | (**Required**) Uri of the thumbnail image                                                                      |
| `thumbnailAnimationDuration`     | `Number`             | Animation duration for thumbnail, defaults to `1000`ms (overrides config)                                      |
| `blurRadius`                     | `Number`             | Amount of blur to apply on `thumbnailSource` image , defaults to `15` (overrides config)                       |
| `loadingImageComponent`          | `React.CompnentType` | Defaults to an image with the `loadingSource` prop                                                             |
| `loadingImageStyle`              | `Object`             | Style for loading image component. Works if you don't provide a `loadingImageComponent`                        |
| `loadingSource`                  | `object`             | Source for loading Image component. Works if you don't provide `loadingImageComponent`                         |
| `onError`                        | `Func`               | Runs when there is an error loading the image from cache                                                       |
| `resizeMode`                     | `String`             | React native Image component [resizeMode](https://reactnative.dev/docs/image#resizemode) defaults to `contain` |
| `style`                          | `Object`             | `source` AND `thumbnailSource` image style                                                                     |
| `options`                        | `Object`             | custom options for the fetch image http request eg. `{headers:{}, body:{}}`                                    |
| `accessibilityHint`              | `string`             | accessibility hint for `source` (optional)                                                                     |
| `accessibilityLabel`             | `string`             | accessibility label for `source` (optional)                                                                    |
| `accessibilityRole`              | `string`             | accessibility role for `source` (optional, defaults to `image`)                                                |
| `accessibilityHintThumbnail`     | `string`             | accessibility hint for `thumbnailSource` (optional)                                                            |
| `accessibilityLabelThumbnail`    | `string`             | accessibility label for `thumbnailSource` (optional)                                                           |
| `accessibilityRoleThumbnail`     | `string`             | accessibility role for `thumbnailSource` (optional, defaults to `image`)                                       |
| `accessibilityHintLoadingImage`  | `string`             | accessibility hint for `loadingSource` (optional)                                                              |
| `accessibilityLabelLoadingImage` | `string`             | accessibility label for `loadingSource` (optional)                                                             |
| `accessibilityRoleLoadingImage`  | `string`             | accessibility role for `loadingSource` (optional, defaults to `image`)                                         |

#### [More info about React Native Accessibility](https://reactnative.dev/docs/accessibility)

#### [Blog Article about React Native Accessibility](https://medium.com/reactbrasil/introducing-react-native-accessibility-engine-fcf78f2a3805)

## Todo:

- ~~Convert library to React Hooks~~
- ~~Make `baseDir` configurable~~
- ~~Delete single cache entry~~

## Authors:

- [Efstathios Ntonas](https://github.com/efstathiosntonas)
- [George Bakogiannis](https://github.com/geobako)
- [George Kallinikos](https://github.com/giokallis)
