import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import {
  Animated,
  Image as RNImage,
  ImageLoadEventData,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import CacheManager from './CacheManager';
import { ImageProps, IProps } from './types';

const AnimatedImage = Animated.createAnimatedComponent(RNImage);
const AnimatedView = Animated.View;

const defaultProps = {
  onError: () => {},
};

function useIsComponentMounted() {
  const isMounted = React.useRef(false);
  // @ts-ignore
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);
  return isMounted;
}

function useStateIfMounted<S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] {
  const isComponentMounted = useIsComponentMounted();
  const [state, setState] = React.useState(initialState);

  const newSetState = useCallback(
    value => {
      if (isComponentMounted.current) {
        setState(value);
      }
    },
    [isComponentMounted]
  );

  return [state, newSetState];
}

const CachedImage = (props: IProps & typeof defaultProps) => {
  const [error, setError] = useStateIfMounted<boolean>(false);
  const [uri, setUri] = useStateIfMounted<string | undefined>(undefined);
  const { source: propsSource } = props;
  const [currentSource, setCurrentSource] = React.useState<string>(propsSource);

  const animatedImage = React.useRef(new Animated.Value(0)).current;

  const animatedThumbnailImage = React.useRef(new Animated.Value(0)).current;

  const animatedLoadingImage = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (propsSource !== uri) {
      load(props).catch();
    }
    if (propsSource !== currentSource) {
      setCurrentSource(propsSource);
      setUri(undefined);
      resetAnimations();
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [propsSource, uri]);

  const load = async ({
    cacheKey,
    onError,
    options = {},
    source,
    noCache = false,
  }: ImageProps): Promise<void> => {
    if (source) {
      try {
        const path = await CacheManager.get(
          source,
          options,
          cacheKey || source,
          noCache
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
      } catch (e: any) {
        setError(true);
        onError({ nativeEvent: { error: e } });
      }
    }
  };

  const resetAnimations = () => {
    animatedLoadingImage.setValue(1);
    animatedThumbnailImage.setValue(0);
    animatedImage.setValue(0);
  };

  const onThumbnailLoad = () => {
    Animated.timing(animatedLoadingImage, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animatedThumbnailImage, {
        toValue: 1,
        duration:
          props.thumbnailAnimationDuration ||
          CacheManager.config.thumbnailAnimationDuration,
        useNativeDriver: true,
      }).start();
    });
  };

  const onImageError = (): void => setError(true);

  const onImageLoad = (e: NativeSyntheticEvent<ImageLoadEventData>): void => {
    if (props.onLoad) {
      props.onLoad(e);
    }
    Animated.timing(animatedImage, {
      toValue: 1,
      duration:
        props.sourceAnimationDuration ||
        CacheManager.config.sourceAnimationDuration,
      useNativeDriver: true,
    }).start();
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
    blurRadius,
    loadingImageComponent: LoadingImageComponent,
    loadingImageStyle = props.style,
    loadingSource,
    resizeMode,
    style,
    thumbnailSource,
    ...rest
  } = props;

  const isImageReady = useMemo(() => !!uri, [uri, propsSource]);

  const imageSource = useMemo(() => {
    return error || !uri
      ? loadingSource
      : {
          uri: Platform.OS === 'android' ? `file://${uri}` : uri,
        };
  }, [uri, error]);

  return (
    <View style={[styles.container, style]}>
      {!isImageReady &&
        (LoadingImageComponent ? (
          <AnimatedView
            style={[
              styles.loadingImageStyle,
              { opacity: animatedLoadingImage },
            ]}
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
              style={[{ opacity: animatedLoadingImage }, loadingImageStyle]}
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
          blurRadius={blurRadius || CacheManager.config.blurRadius}
          onLoad={onThumbnailLoad}
          resizeMode={resizeMode || 'contain'}
          source={{ uri: thumbnailSource }}
          style={[style, { opacity: animatedThumbnailImage }]}
        />
      )}
      {imageSource && (
        <AnimatedImage
          {...rest}
          accessibilityHint={accessibilityHint}
          accessibilityLabel={accessibilityLabel}
          accessibilityRole={accessibilityRole || 'image'}
          accessible
          onError={onImageError}
          onLoad={onImageLoad}
          onLoadEnd={props.onLoadEnd}
          resizeMode={resizeMode || 'contain'}
          // @ts-ignore
          source={imageSource}
          // @ts-ignore
          style={[styles.imageStyle, { opacity: animatedImage }]}
        />
      )}
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

CachedImage.defaultProps = defaultProps;

export default CachedImage;
