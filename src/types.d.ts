import {
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  ImageURISource,
  StyleProp,
} from 'react-native';
import React from 'react';

export interface DownloadOptions {
  headers?: { [name: string]: string };
}

export interface ImageState {
  error: boolean;
  imageLoaded: boolean;
  showDefault: boolean;
  uri: string | undefined;
}

export type ImageProps = {
  cacheKey?: string;
  defaultSource?: ImageURISource | number;
  onError: (error: { nativeEvent: { error: Error } }) => void;
  options?: DownloadOptions;
  source: string;
  style?: StyleProp<ImageStyle>;
  thumbnailSource?: string;
};

export interface IProps {
  blurRadius?: number;
  cacheKey?: string;
  sourceAnimationDuration?: number;
  loadingImageComponent?: React.ComponentType;
  loadingImageStyle?: StyleProp<ImageStyle>;
  loadingSource?: ImageSourcePropType;
  onError?: (error: { nativeEvent: { error: Error } }) => void;
  options?: DownloadOptions;
  resizeMode?: ImageResizeMode;
  source: string;
  style?: StyleProp<ImageStyle>;
  thumbnailAnimationDuration?: number;
  thumbnailSource?: string;
}

export interface Config {
  baseDir: string;
  blurRadius: number;
  sourceAnimationDuration: number;
  thumbnailAnimationDuration: number;
}
