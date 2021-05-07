import {
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  ImageURISource,
  StyleProp,
} from 'react-native';
import React from 'react';

export declare type ImageSource = {
  uri?: string;
  headers?: {
    [key: string]: string;
  };
};

export interface DownloadOptions {
  md5?: boolean;
  headers?: { [name: string]: string };
}

export interface ImageState {
  source: any;
  imageLoaded: boolean;
  error: boolean;
  showDefault: boolean;
}

export interface ImageProps {
  style?: StyleProp<ImageStyle>;
  defaultSource?: ImageURISource | number;
  thumbnailSource?: ImageSource;
  options?: DownloadOptions;
  source: ImageSource;
  cacheKey?: string;
  onError: (error: { nativeEvent: { error: Error } }) => void;
}

interface IProps {
  cacheKey?: string;
  imageAnimationDuration?: number;
  loadingImageComponent?: React.ReactNode;
  loadingImageStyle?: StyleProp<ImageStyle>;
  loadingSource?: ImageSourcePropType;
  onError: (error: { nativeEvent: { error: Error } }) => void;
  options?: DownloadOptions;
  resizeMode?: ImageResizeMode;
  source: ImageSource;
  style?: StyleProp<ImageStyle>;
  thumbnailAnimationDuration?: number;
  thumbnailSource: ImageSource;
  useNativeDriver?: boolean;
}
