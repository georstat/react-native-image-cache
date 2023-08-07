import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
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
  const isMounted = useRef(false);
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
    (value: any) => {
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
  const { source: propsSource, options: propsOptions } = props;
  const currentSource = useRef<string>(propsSource);

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
    load(props).catch();
    if (propsSource !== currentSource.current) {
      currentSource.current = propsSource;
      resetAnimations();
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [propsSource, propsOptions]);

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
          setUri(undefined);
          setError(true);
          onError({
            nativeEvent: { error: new Error('Could not load image') },
          });
        }
      } catch (e: any) {
        setUri(undefined);
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
          props.thumbnailAnimationDuration === 0
            ? 0
            : props.thumbnailAnimationDuration ||
              CacheManager?.config?.thumbnailAnimationDuration ||
              100,
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
        props.sourceAnimationDuration === 0
          ? 0
          : props.sourceAnimationDuration ||
            CacheManager?.config?.sourceAnimationDuration ||
            100,
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
            {loadingSource && (
              <AnimatedImage
                accessibilityHint={accessibilityHintLoadingImage}
                accessibilityLabel={accessibilityLabelLoadingImage}
                accessibilityRole={accessibilityRoleLoadingSource || 'image'}
                accessible
                resizeMode={resizeMode || 'contain'}
                style={[animatedLoadingImageStyle, loadingImageStyle]}
                source={loadingSource}
              />
            )}
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
          source={{ uri: thumbnailSource, ...propsOptions }}
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
          // @ts-ignore, reanimated image doesn't have tintColor typing
          tintColor={props.tintColor}
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
