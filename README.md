# React Native Image Cache with Progressive Loading
[![npm version](https://badge.fury.io/js/%40georstat%2Freact-native-image-cache.svg)](https://badge.fury.io/js/%40georstat%2Freact-native-image-cache)

Inpired by:

- https://github.com/wcandillon/react-native-expo-image-cache (William Candillon)
- https://github.com/WrathChaos/react-native-progressive-fast-image (FreakyCoder)

## Features

- Cache remote images in file system with progressive loading
- Uses [`react-native-file-access`](https://github.com/alpha0010/react-native-file-access) for file system access
- Written in `Typescript`

## Preview
https://user-images.githubusercontent.com/717975/117415299-cf7fb700-af20-11eb-8bcb-be8bfa3f655d.mov


## Installation

yarn:
```
yarn add @georstat/react-native-image-cache
```
npm:
```
npm i @georstat/react-native-image-cache
```

## Usage
```tsx
import { CachedImage } from '@georstat/react-native-image-cache';

<CachedImage
  source={{uri: 'https://via.placeholder.com/3500x3500'}}
  style={{height: 350, width: 150}}
  thumbnailSource={{uri: 'https://via.placeholder.com/350x150'}}
/>
```

You can also clear the local cache:

```tsx
import { CacheManager } from "@georstat/react-native-image-cache";

await CacheManager.clearCache();
```

## Todo:
- Convert library to React Hooks

## Authors:
- [Efstathios Ntonas](https://github.com/efstathiosntonas)
- [George Bakogiannis](https://github.com/geobako)
- [George Kallinikos](https://github.com/giokallis)
