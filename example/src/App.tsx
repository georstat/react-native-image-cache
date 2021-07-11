import * as React from 'react';
import { useCallback } from 'react';
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CachedImage, CacheManager } from '@georstat/react-native-image-cache';
import { Dirs } from 'react-native-file-access';
import ImagePlaceholder from './ImagePlaceholder';

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 15,
  sourceAnimationDuration: 1000,
  thumbnailAnimationDuration: 1000,
};

const img =
  'https://upload.wikimedia.org/wikipedia/commons/2/24/Willaerts_Adam_The_Embarkation_of_the_Elector_Palantine_Oil_Canvas-huge.jpg';

const imgThumb =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Willaerts_Adam_The_Embarkation_of_the_Elector_Palantine_Oil_Canvas-huge.jpg/320px-Willaerts_Adam_The_Embarkation_of_the_Elector_Palantine_Oil_Canvas-huge.jpg';

const img2 =
  'https://images.unsplash.com/photo-1623849778517-668dffe703fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format';

const App = () => {
  const [source, setSource] = React.useState(img);
  const clearCache = useCallback(async () => {
    try {
      await CacheManager.clearCache();
      Alert.alert('Cache cleared');
    } catch (e) {
      Alert.alert(e);
    }
  }, []);

  const clearSingleImageFromCache = useCallback(async () => {
    try {
      await CacheManager.removeCacheEntry(img);
      Alert.alert('Image cleared from cache');
    } catch (e) {
      Alert.alert(e);
    }
  }, []);

  const changeSource = () => {
    setSource(src => (src === img ? img2 : img));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>Non Cached Image: (5.4MB)</Text>
        <Image
          resizeMode="cover"
          source={{
            uri: source,
          }}
          style={styles.image}
        />
        <Text style={styles.bottomText}>
          Cached Image With Thumbnail: (5.4MB, thumb: 14KB)
        </Text>
        <View style={styles.cachedImageContainer}>
          <CachedImage
            source={img}
            style={styles.image}
            thumbnailSource={imgThumb}
          />
        </View>
        <Text style={styles.bottomText}>
          Cached Image With Custom Loading Placeholder: (5.4MB)
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
            color="white"
            onPress={clearCache}
            title="Clear Entire Cache"
          />
        </View>
        <View style={styles.clearCacheButtonContainer}>
          <Button
            color="white"
            onPress={clearSingleImageFromCache}
            title="Clear only image"
          />
        </View>
        <View style={styles.clearCacheButtonContainer}>
          <Button
            color="white"
            onPress={changeSource}
            title="Change Image source"
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
    width: 250,
  },
  text: {
    fontSize: 18,
    marginLeft: 12,
    marginTop: 12,
  },
});

export default App;
