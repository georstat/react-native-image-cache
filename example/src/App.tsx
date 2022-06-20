import * as React from 'react';
import { useCallback, useEffect } from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CachedImage, CacheManager } from '@georstat/react-native-image-cache';
import { Dirs } from 'react-native-file-access';
import ImagePlaceholder from './ImagePlaceholder';

const pickButtonColor = Platform.OS === 'ios' ? 'white' : 'black';

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 15,
  cacheLimit: 1024 * 1024 * 256, // ~256MB
  sourceAnimationDuration: 1000,
  thumbnailAnimationDuration: 1000,
  getCustomCacheKey: (source: string) => {
    // Remove params from the URL for caching images (useful for caching images from Amazons S3 bucket and etc)
    let newCacheKey = source;
    if (source.includes('?')) {
      newCacheKey = source.substring(0, source.lastIndexOf('?'));
    }
    return newCacheKey;
  },
};

const prefetchImage =
  'https://upload.wikimedia.org/wikipedia/commons/0/02/Oia_dal_battello_al_tramonto_-_Santorini_-_Grecia_-_agosto_2018.jpg';

const prefetchImageTwo =
  'https://upload.wikimedia.org/wikipedia/commons/4/48/Thira_%28Santorini%29_-_Ia-01.jpg';

const prefetchImageThree =
  'https://upload.wikimedia.org/wikipedia/commons/3/37/Oia_sunset_-_panoramio_%282%29.jpg';

const img =
  'https://upload.wikimedia.org/wikipedia/commons/c/c6/Attica_06-13_Athens_50_View_from_Philopappos_-_Acropolis_Hill.jpg';

const imgThumb =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Attica_06-13_Athens_50_View_from_Philopappos_-_Acropolis_Hill.jpg/320px-Attica_06-13_Athens_50_View_from_Philopappos_-_Acropolis_Hill.jpg';

const img2 =
  'https://images.unsplash.com/photo-1623849778517-668dffe703fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format';

const App = ({ navigation }: { navigation: any }) => {
  const [source, setSource] = React.useState(img);
  const clearCache = useCallback(async () => {
    try {
      await CacheManager.clearCache();
      Alert.alert('Cache cleared');
    } catch (e: any) {
      Alert.alert(e);
    }
  }, []);

  const clearSingleImageFromCache = useCallback(async () => {
    try {
      await CacheManager.removeCacheEntry(img);
      Alert.alert('Image cleared from cache');
    } catch (e: any) {
      Alert.alert(e);
    }
  }, []);

  const changeSource = () => {
    setSource(src => (src === img ? img2 : img));
  };

  const onPrefetchImages = () => {
    navigation.navigate('PrefetchImage');
  };

  useEffect(() => {
    CacheManager.prefetch(prefetchImage);
    CacheManager.prefetch([prefetchImageTwo, prefetchImageThree]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>Non Cached Image: (7.06MB)</Text>
        <Image
          resizeMode="cover"
          source={{
            uri: source,
          }}
          style={styles.image}
        />
        <Text style={styles.bottomText}>
          Cached Image With Thumbnail: (7.06MB, thumb: 25KB)
        </Text>
        <View style={styles.cachedImageContainer}>
          <CachedImage
            resizeMode="cover"
            source={img}
            style={styles.image}
            thumbnailSource={imgThumb}
          />
        </View>
        <Text style={styles.bottomText}>
          Cached Image With Custom Loading Placeholder: (7.06MB)
        </Text>
        <View style={styles.cachedImageContainer}>
          <CachedImage
            source={source}
            style={styles.image}
            blurRadius={1}
            loadingImageComponent={ImagePlaceholder}
          />
        </View>
        <View style={styles.clearCacheButtonContainer}>
          <Button
            color={pickButtonColor}
            onPress={clearCache}
            title="Clear Entire Cache"
          />
        </View>
        <View style={styles.clearCacheButtonContainer}>
          <Button
            color={pickButtonColor}
            onPress={clearSingleImageFromCache}
            title="Clear only image"
          />
        </View>
        <View style={styles.clearCacheButtonContainer}>
          <Button
            color={pickButtonColor}
            onPress={changeSource}
            title="Change Image source"
          />
        </View>
        <View style={styles.clearCacheButtonContainer}>
          <Button
            color={pickButtonColor}
            onPress={onPrefetchImages}
            title="Prefetch Images"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomText: {
    fontSize: 18,
    marginLeft: 12,
    marginTop: 30,
  },
  cachedImageContainer: {
    alignItems: 'center',
  },
  clearCacheButtonContainer: {
    alignSelf: 'center',
    backgroundColor: 'red',
    marginTop: 30,
    width: 200,
  },
  container: {
    flex: 1,
  },
  image: {
    alignSelf: 'center',
    height: 250,
    marginTop: 12,
    width: Dimensions.get('screen').width - 40,
  },
  text: {
    fontSize: 18,
    marginLeft: 12,
    marginTop: 12,
  },
});

export default App;
