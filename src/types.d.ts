import {
  AccessibilityRole,
  ImageLoadEventData,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  ImageURISource,
  NativeSyntheticEvent,
  StyleProp,
} from 'react-native';
import React from 'react';

export interface DownloadOptions {
  headers?: {
    [name: string]: string;
  };
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
  maxAge?: number;
  noCache?: boolean;
  onError: (error: { nativeEvent: { error: Error } }) => void;
  options?: DownloadOptions;
  source: string;
  style?: StyleProp<ImageStyle>;
  thumbnailSource?: string;
};

export interface IProps {
  accessibilityHint?: string;
  accessibilityHintLoadingImage?: string;
  accessibilityHintThumbnail?: string;
  accessibilityLabel?: string;
  accessibilityLabelLoadingImage?: string;
  accessibilityLabelThumbnail?: string;
  accessibilityRole?: AccessibilityRole;
  accessibilityRoleLoadingSource?: AccessibilityRole;
  accessibilityRoleThumbnail?: AccessibilityRole;
  blurRadius?: number;
  cacheKey?: string;
  loadingImageComponent?: React.ComponentType;
  loadingImageStyle?: StyleProp<ImageStyle>;
  loadingSource?: ImageSourcePropType;
  maxAge?: number;
  noCache?: boolean;
  onError?: (error: { nativeEvent: { error: Error } }) => void;
  onLoad?: (event: NativeSyntheticEvent<ImageLoadEventData>) => void;
  onLoadEnd?: () => void;
  options?: DownloadOptions;
  resizeMode?: ImageResizeMode;
  source: string;
  sourceAnimationDuration?: number;
  style?: StyleProp<ImageStyle>;
  testID?: string;
  thumbnailAnimationDuration?: number;
  thumbnailSource?: string;
}

export interface Config {
  baseDir: string;
  blurRadius: number;
  cacheLimit: number;
  getCustomCacheKey?: (source: string) => string;
  sourceAnimationDuration: number;
  thumbnailAnimationDuration: number;
}
