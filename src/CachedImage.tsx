import React, { useEffect } from 'react';
import {
  Animated,
  Image as RNImage,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import { ImageProps, IProps } from './types';
import CacheManager from './CacheManager';

const AnimatedImage = Animated.createAnimatedComponent(RNImage);

const CachedImage: React.FC<IProps> = props => {
  const [error, setError] = React.useState<boolean>(false);
  const [uri, setUri] = React.useState<string | undefined>(undefined);

  const animatedImage = React.useRef(new Animated.Value(0)).current;

  const animatedThumbnailImage = React.useRef(new Animated.Value(0)).current;

  const animatedLoadingImage = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (props.source !== uri) {
      load(props);
    }
  }, [props, uri]);

  const load = async ({
    cacheKey,
    onError,
    options = {},
    source,
  }: ImageProps): Promise<void> => {
    if (source) {
      try {
        const path = await CacheManager.get(
          source,
          options,
          cacheKey || source
        ).getPath();
        if (path) {
          setUri(path);
          setError(false);
        } else {
          setError(true);
          onError({
            nativeEvent: { error: new Error('Could not load image') },
          });
        }
      } catch (e) {
        setError(true);
        onError({ nativeEvent: { error: e } });
      }
    }
  };

  const onThumbnailLoad = () => {
    console.log(3333);
    Animated.timing(animatedLoadingImage, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animatedThumbnailImage, {
        toValue: 1,
        duration: props.thumbnailAnimationDuration,
        useNativeDriver: true,
      }).start();
    });
  };

  const onImageError = (): void => setError(true);

  const onImageLoad = (): void => {
    Animated.timing(animatedImage, {
      toValue: 1,
      duration: props.sourceAnimationDuration,
      useNativeDriver: true,
    }).start();
  };

  const {
    loadingImageComponent,
    loadingImageStyle = props.style,
    loadingSource,
    resizeMode,
    style,
    thumbnailSource,
    ...rest
  } = props;

  const isImageReady = !!uri;

  return (
    <View style={styles.container}>
      {loadingImageComponent ||
        (loadingSource && !isImageReady && (
          <View style={[styles.loadingImageStyle, style]}>
            <AnimatedImage
              resizeMode={resizeMode || 'contain'}
              style={[{ opacity: animatedLoadingImage }, loadingImageStyle]}
              // @ts-ignore
              source={loadingSource}
            />
          </View>
        ))}
      <AnimatedImage
        blurRadius={15}
        onLoad={onThumbnailLoad}
        resizeMode={resizeMode || 'contain'}
        source={{ uri: thumbnailSource }}
        style={[{ opacity: animatedThumbnailImage }, style]}
      />
      <AnimatedImage
        {...rest}
        onError={onImageError}
        onLoad={onImageLoad}
        resizeMode={resizeMode || 'contain'}
        // @ts-ignore
        source={
          error || !uri
            ? loadingSource
            : {
                uri: Platform.OS === 'android' ? `file://${uri}` : uri,
              }
        }
        // @ts-ignore
        style={[styles.imageStyle, { opacity: animatedImage }, style]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  imageStyle: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  loadingImageStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

CachedImage.defaultProps = {
  sourceAnimationDuration: 200,
  onError: () => {},
  thumbnailAnimationDuration: 200,
};

export default CachedImage;
