import React from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import CacheManager from './CacheManager';
import { useSetupState } from './hooks';
import { IProps } from './types';
import { defaultProps, styles } from './defaultConfiguration';
import FastImage, {
  FastImageProps,
  OnLoadEvent,
} from 'react-native-fast-image';

// Class component makes createAnimatedComponent happy
class FastImageWrapper extends React.Component<FastImageProps> {
  render() {
    return <FastImage {...this.props} />;
  }
}

const AnimatedImage = Animated.createAnimatedComponent(FastImageWrapper);
const AnimatedView = Animated.View;

const CachedImage = (props: IProps & typeof defaultProps) => {
  const { onImageComponentError, isImageReady, imageSource, keyModifier } =
    useSetupState(props);
  const animatedImage = useSharedValue(0);
  const animatedThumbnailImage = useSharedValue(0);
  const animatedLoadingImage = useSharedValue(1);

  const imageSourceStyle = useAnimatedStyle(() => {
    return { opacity: animatedImage.value };
  });

  const thumbnailSourceStyle = useAnimatedStyle(() => {
    return { opacity: animatedThumbnailImage.value };
  });

  const animatedLoadingImageStyle = useAnimatedStyle(() => {
    return { opacity: animatedLoadingImage.value };
  });

  // Once the image loads we don't want to re-trigger animations
  // const resetAnimations = () => {
  //   animatedLoadingImage.value = 1;
  //   animatedThumbnailImage.value = 0;
  //   animatedImage.value = 0;
  // };

  const onThumbnailLoad = () => {
    animatedLoadingImage.value = withTiming(0, {}, () => {
      animatedThumbnailImage.value = withTiming(1, {
        duration:
          props.thumbnailAnimationDuration ||
          CacheManager.config.thumbnailAnimationDuration,
      });
    });
  };

  const onImageLoad = (e: OnLoadEvent): void => {
    if (props.onLoad) {
      props.onLoad(e);
    }
    animatedImage.value = withTiming(1, {
      duration:
        props.sourceAnimationDuration ||
        CacheManager.config.sourceAnimationDuration,
    });
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
          <AnimatedView
            style={[styles.loadingImageStyle, animatedLoadingImageStyle]}
          >
            <LoadingImageComponent />
          </AnimatedView>
        ) : (
          <View style={[styles.loadingImageStyle]}>
            <AnimatedImage
              accessibilityHint={accessibilityHintLoadingImage}
              accessibilityLabel={accessibilityLabelLoadingImage}
              accessibilityRole={accessibilityRoleLoadingSource || 'image'}
              accessible
              resizeMode={resizeMode || 'contain'}
              style={[animatedLoadingImageStyle, loadingImageStyle]}
              // @ts-ignore
              source={loadingSource}
            />
          </View>
        ))}
      {thumbnailSource && (
        <AnimatedImage
          accessibilityHint={accessibilityHintThumbnail}
          accessibilityLabel={accessibilityLabelThumbnail}
          accessibilityRole={accessibilityRoleThumbnail || 'image'}
          accessible
          // blurRadius={blurRadius || CacheManager.config.blurRadius}
          onLoad={onThumbnailLoad}
          resizeMode={resizeMode || 'contain'}
          source={{ uri: thumbnailSource }}
          style={[style, thumbnailSourceStyle]}
        />
      )}
      {imageSource && (
        <AnimatedImage
          {...rest}
          key={`animated-image-${keyModifier}`}
          accessibilityHint={accessibilityHint}
          accessibilityLabel={accessibilityLabel}
          accessibilityRole={accessibilityRole || 'image'}
          accessible
          onError={onImageComponentError}
          onLoad={onImageLoad}
          onLoadEnd={props.onLoadEnd}
          resizeMode={resizeMode || 'contain'}
          // @ts-ignore
          source={imageSource}
          // @ts-ignore
          style={[styles.imageStyle, imageSourceStyle]}
        />
      )}
    </View>
  );
};

CachedImage.defaultProps = defaultProps;

export default CachedImage;
