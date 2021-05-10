import {
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  ImageURISource,
  StyleProp,
} from 'react-native';
import React from 'react';

export const defaultProps = {
  sourceAnimationDuration: 200,
  onError: () => {},
  thumbnailAnimationDuration: 200,
};

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
} & typeof defaultProps;

export interface IProps {
  cacheKey?: string;
  sourceAnimationDuration?: number;
  loadingImageComponent?: React.ReactNode;
  loadingImageStyle?: StyleProp<ImageStyle>;
  loadingSource?: ImageSourcePropType;
  onError?: (error: { nativeEvent: { error: Error } }) => void;
  options?: DownloadOptions;
  resizeMode?: ImageResizeMode;
  source: string;
  style?: StyleProp<ImageStyle>;
  thumbnailAnimationDuration?: number;
  thumbnailSource: string;
}
