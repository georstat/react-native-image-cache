import React from 'react';
import { View } from 'react-native';
import FastImage, { OnLoadEvent } from 'react-native-fast-image';

import { defaultProps, styles } from './defaultConfiguration';
import { useSetupState } from './hooks';
import { IProps } from './types';

const CachedImage = (props: IProps & typeof defaultProps) => {
  const { onImageComponentError, isImageReady, imageSource, keyModifier } =
    useSetupState(props);

  const onImageLoad = (e: OnLoadEvent): void => {
    if (props.onLoad) {
      props.onLoad(e);
    }
  };

  const {
    accessibilityRole,
    accessibilityRoleThumbnail,
    accessibilityRoleLoadingSource,
    accessibilityHint,
    accessibilityHintLoadingImage,
    accessibilityHintThumbnail,
    accessibilityLabel,
    accessibilityLabelLoadingImage,
    accessibilityLabelThumbnail,
    loadingImageComponent: LoadingImageComponent,
    loadingImageStyle = props.style,
    loadingSource,
    resizeMode,
    style,
    testID,
    thumbnailSource,
    ...rest
  } = props;

  return (
    <View style={[styles.container, style]} testID={testID}>
      {!isImageReady &&
        (LoadingImageComponent ? (
          <View style={styles.loadingImageStyle}>
            <LoadingImageComponent />
          </View>
        ) : (
          <View style={[styles.loadingImageStyle]}>
            <FastImage
              accessibilityHint={accessibilityHintLoadingImage}
              accessibilityLabel={accessibilityLabelLoadingImage}
              accessibilityRole={accessibilityRoleLoadingSource || 'image'}
              accessible
              resizeMode={resizeMode || 'contain'}
              style={loadingImageStyle}
              // @ts-ignore
              source={loadingSource}
            />
          </View>
        ))}
      {thumbnailSource && (
        <FastImage
          accessibilityHint={accessibilityHintThumbnail}
          accessibilityLabel={accessibilityLabelThumbnail}
          accessibilityRole={accessibilityRoleThumbnail || 'image'}
          accessible
          // blurRadius={blurRadius || CacheManager.config.blurRadius}
          resizeMode={resizeMode || 'contain'}
          source={{ uri: thumbnailSource }}
          style={style}
        />
      )}
      {imageSource && (
        <FastImage
          {...rest}
          key={`static-image-${keyModifier}`}
          accessibilityHint={accessibilityHint}
          accessibilityLabel={accessibilityLabel}
          accessibilityRole={accessibilityRole || 'image'}
          accessible
          onError={onImageComponentError}
          onLoad={onImageLoad}
          onLoadEnd={props.onLoadEnd}
          resizeMode={resizeMode || 'contain'}
          source={imageSource}
          style={styles.imageStyle}
        />
      )}
    </View>
  );
};

CachedImage.defaultProps = defaultProps;

export default CachedImage;
