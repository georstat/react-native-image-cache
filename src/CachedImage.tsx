import React from 'react';
import {
  Animated,
  Image as RNImage,
  Platform,
  StyleSheet,
  View,
} from 'react-native';

import { ImageProps, ImageState, IProps } from './types';
import CacheManager from './CacheManager';

export default class CachedImage extends React.Component<IProps, ImageState> {
  animatedImage = new Animated.Value(0);

  animatedThumbnailImage = new Animated.Value(0);

  animatedLoadingImage = new Animated.Value(1);

  mounted = true;

  static defaultProps = {
    onError: () => {},
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      showDefault: true,
      error: false,
      imageLoaded: false,
      source: { uri: undefined },
    };
  }

  componentDidMount() {
    this.load(this.props).catch(e => console.log(e));
  }

  componentDidUpdate(prevProps: any) {
    const { source } = this.props;
    if (source?.uri !== prevProps.source.uri) {
      this.load(this.props).catch(e => console.log(e));
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onThumbnailLoad = () => {
    Animated.timing(this.animatedLoadingImage, {
      toValue: 0,
      useNativeDriver: this.props.useNativeDriver || true,
    }).start(() => {
      Animated.timing(this.animatedThumbnailImage, {
        toValue: 1,
        duration: this.props.thumbnailAnimationDuration,
        useNativeDriver: this.props.useNativeDriver || true,
      }).start();
    });
  };

  onLoadEnd = () => {
    this.setState({ showDefault: false });
  };

  onError = () => {
    this.setState({ error: true });
  };

  onImageLoad = () => {
    this.setState({ imageLoaded: false });
    Animated.timing(this.animatedImage, {
      toValue: 1,
      duration: this.props.imageAnimationDuration,
      useNativeDriver: this.props.useNativeDriver || true,
    }).start();
  };

  async load({
    source,
    options = {},
    cacheKey,
    onError,
  }: ImageProps): Promise<void> {
    if (source.uri) {
      try {
        const path = await CacheManager.get(
          source,
          options,
          cacheKey || source.uri
        ).getPath();
        if (this.mounted) {
          if (path) {
            this.setState({
              source: { uri: path },
              error: false,
            });
          } else {
            this.setState({ error: true });
            onError({
              nativeEvent: { error: new Error('Could not load image') },
            });
          }
        }
      } catch (error) {
        this.onError();
        onError({ nativeEvent: { error } });
      }
    }
  }

  render() {
    const {
      style,
      loadingSource,
      thumbnailSource,
      loadingImageComponent,
      loadingImageStyle = this.props.style,
      resizeMode,
      ...props
    } = this.props;
    const { source, error } = this.state;
    const isImageReady = !!source;

    return (
      <View style={styles.container}>
        {loadingImageComponent ||
          (loadingSource && !isImageReady && (
            <View style={[styles.loadingImageStyle, style]}>
              <AnimatedImage
                resizeMode={resizeMode || 'contain'}
                style={[
                  { opacity: this.animatedLoadingImage },
                  loadingImageStyle,
                ]}
                // @ts-ignore
                source={this.props.loadingSource}
              />
            </View>
          ))}
        <Animated.Image
          blurRadius={15}
          source={thumbnailSource}
          resizeMode={resizeMode || 'contain'}
          onLoad={this.onThumbnailLoad}
          style={[{ opacity: this.animatedThumbnailImage }, style]}
        />
        <AnimatedImage
          {...props}
          onError={this.onError}
          onLoad={this.onImageLoad}
          onLoadEnd={this.onLoadEnd}
          resizeMode={resizeMode || 'contain'}
          // @ts-ignore
          style={[styles.imageStyle, { opacity: this.animatedImage }, style]}
          // @ts-ignore
          source={
            error || !source.uri
              ? loadingSource
              : {
                  uri:
                    Platform.OS === 'android'
                      ? `file://${source.uri}`
                      : source.uri,
                }
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  imageStyle: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  loadingImageStyle: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

const AnimatedImage = Animated.createAnimatedComponent(RNImage);
