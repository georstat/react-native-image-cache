import { AccessibilityRole, ImageURISource, StyleProp } from 'react-native';
import * as FastImage from 'react-native-fast-image';
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

export interface ImageProps {
  cacheKey?: string;
  defaultSource?: ImageURISource | number;
  maxAge?: number;
  noCache?: boolean;
  onError: (error: { nativeEvent: { error: Error } }) => void;
  options?: DownloadOptions;
  source: string;
  style?: StyleProp<FastImage.ImageStyle>;
  thumbnailSource?: string;
}

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
  loadingImageStyle?: StyleProp<FastImage.ImageStyle>;
  loadingSource?: FastImage.Source;
  maxAge?: number;
  noCache?: boolean;
  onCacheError?: (error: { nativeEvent: { error: Error } }) => void;
  onImageComponentError?: (error: { nativeEvent: { error: Error } }) => void;
  onLoad?: (event: FastImage.OnLoadEvent) => void;
  onLoadEnd?: () => void;
  options?: DownloadOptions;
  resizeMode?: FastImage.ResizeMode;
  source: string;
  sourceAnimationDuration?: number;
  style?: StyleProp<FastImage.ImageStyle>;
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
  refreshIntervalHours: number;
}
