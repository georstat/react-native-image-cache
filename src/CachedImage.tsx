import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import {
  ImageLoadEventData,
  NativeSyntheticEvent,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import CacheManager from './CacheManager';
import { ImageProps, IProps } from './types';

const AnimatedImage = Animated.Image;
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
    maxAge,
    noCache = false,
    onError,
    options = {},
    source,
  }: ImageProps): Promise<void> => {
    if (source) {
      try {
        const path = await CacheManager.get(
          source,
          options,
          noCache,
          maxAge
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
    animatedLoadingImage.value = 1;
    animatedThumbnailImage.value = 0;
    animatedImage.value = 0;
  };

  const onThumbnailLoad = () => {
    animatedLoadingImage.value = withTiming(0, {}, () => {
      animatedThumbnailImage.value = withTiming(1, {
        duration:
          props.thumbnailAnimationDuration ||
          CacheManager.config.thumbnailAnimationDuration,
      });
    });
  };

  const onImageError = (): void => setError(true);

  const onImageLoad = (e: NativeSyntheticEvent<ImageLoadEventData>): void => {
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
    blurRadius,
    loadingImageComponent: LoadingImageComponent,
    loadingImageStyle = props.style,
    loadingSource,
    resizeMode,
    style,
    testID,
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
          blurRadius={blurRadius || CacheManager.config.blurRadius}
          onLoad={onThumbnailLoad}
          resizeMode={resizeMode || 'contain'}
          source={{ uri: thumbnailSource }}
          style={[style, thumbnailSourceStyle]}
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
          style={[styles.imageStyle, imageSourceStyle]}
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
