import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import CacheManager from './CacheManager';
import { IProps } from './types';

function useStableCallback<
  T extends (arg1?: any, arg2?: any, arg3?: any) => any,
>(cb: T) {
  const cbRef = useRef(cb);
  cbRef.current = cb;
  const stableCb = useCallback(
    (...args: Parameters<T>) => cbRef.current(...args),
    []
  );
  return stableCb as T;
}

function usePersistedState<T>(_key: string, initialState: T) {
  // This is a stub for MMKV
  return useState<T>(initialState);
}

export function useSetupState(props: IProps) {
  const propsSource = props.source;
  const loadingSource = props.loadingSource;

  const [uri, setUri] = usePersistedState<string | null>(propsSource, null);
  const [error, setError] = useState<string | null>(null);
  const [keyModifier, setKeyModifier] = useState(0);

  const load = useStableCallback(async () => {
    const { maxAge, noCache = false, options = {}, source } = props;
    if (!source) return;
    const path = await CacheManager.get(
      source,
      options,
      noCache,
      maxAge
    ).getPath();
    if (path) {
      // NOTE: Avoid doing work here (setting more state). I found that adding even one additional
      // state setter resulted in noticeable differences in image load times.
      if (path !== uri) setUri(path);
      if (error) setError(null);
      return path;
    } else {
      throw new Error('Could not load image: no path');
    }
  });

  useEffect(() => {
    if (error) {
      // If an error occurs, try to reload the image and bump the key so that
      // the component forces a refresh.
      load().then(path => {
        if (path) {
          setKeyModifier(prev => prev + 1);
        }
      });
    }
  }, [error, load]);

  useEffect(() => {
    if (propsSource !== uri) {
      load().catch((err: any) => {
        setError('cache-load-error');
        props.onCacheError?.({ nativeEvent: { error: err } });
      });
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [propsSource, uri, load]);

  const imageSource =
    error || !uri
      ? loadingSource
      : {
          uri: Platform.OS === 'android' ? `file://${uri}` : uri,
        };

  const onImageComponentError = (err?: {
    nativeEvent: { code?: string; message?: string };
  }) => {
    // NOTE: The most likely reason for this error is that iOS has automatically
    // deleted images from the cache.
    const error = new Error(
      err?.nativeEvent?.message || 'Image Component (FastImage)'
    );
    props.onImageComponentError?.({ nativeEvent: { error } });
    setError('image-component-error');
  };

  return {
    error,
    onImageComponentError,
    isImageReady: !!uri,
    imageSource,
    keyModifier,
  };
}
