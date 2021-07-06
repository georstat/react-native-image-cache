import * as React from 'react';
import {useCallback} from 'react';
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {CachedImage, CacheManager} from '@georstat/react-native-image-cache';
import {Dirs} from 'react-native-file-access';

CacheManager.config = {
  baseDir: `${Dirs.CacheDir}/images_cache/`,
  blurRadius: 15,
  sourceAnimationDuration: 1000,
  thumbnailAnimationDuration: 1000,
};

let img =
  'https://upload.wikimedia.org/wikipedia/commons/2/24/Willaerts_Adam_The_Embarkation_of_the_Elector_Palantine_Oil_Canvas-huge.jpg';

let imgThumb =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Willaerts_Adam_The_Embarkation_of_the_Elector_Palantine_Oil_Canvas-huge.jpg/320px-Willaerts_Adam_The_Embarkation_of_the_Elector_Palantine_Oil_Canvas-huge.jpg';

const App = () => {
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>Non Cached Image: (5.4MB)</Text>
        <Image
          resizeMode="cover"
          source={{
            uri: img,
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

        <View style={styles.clearCachButtonContainer}>
          <Button
            color="blue"
            onPress={clearCache}
            title="Clear Entire Cache"
          />
        </View>
        <View style={styles.clearCachButtonContainer}>
          <Button
            color="blue"
            onPress={clearSingleImageFromCache}
            title="Clear only image"
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
  clearCachButtonContainer: {
    alignSelf: 'center',
    backgroundColor: 'white',
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
