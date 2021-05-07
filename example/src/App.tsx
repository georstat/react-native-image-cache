import * as React from 'react';
import {
  Alert,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CachedImage, CacheManager} from '@georstat/react-native-image-cache';
import {useCallback} from 'react';

const App = () => {
  const clearCache = useCallback(async () => {
    try {
      await CacheManager.clearCache();
      Alert.alert('Cache cleared');
    } catch (e) {
      Alert.alert(e);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Non Cached Image: (5.4MB)</Text>
      <Image
        source={{
          uri:
            'https://upload.wikimedia.org/wikipedia/commons/2/24/Willaerts_Adam_The_Embarkation_of_the_Elector_Palantine_Oil_Canvas-huge.jpg',
        }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.bottomText}>
        Cached Image With Thumbnail: (5.4MB, thumb: 14KB)
      </Text>
      <View style={styles.cachedImageContainer}>
        <CachedImage
          thumbnailSource={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Willaerts_Adam_The_Embarkation_of_the_Elector_Palantine_Oil_Canvas-huge.jpg/320px-Willaerts_Adam_The_Embarkation_of_the_Elector_Palantine_Oil_Canvas-huge.jpg',
          }}
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/commons/2/24/Willaerts_Adam_The_Embarkation_of_the_Elector_Palantine_Oil_Canvas-huge.jpg',
          }}
          style={styles.image}
        />
      </View>

      <View style={styles.clearCachButtonContainer}>
        <Button title="Clear Cache" onPress={clearCache} color="white" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginTop: 12,
  },
  text: {
    fontSize: 18,
    marginLeft: 12,
    marginTop: 12,
  },
  cachedImageContainer: {
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 18,
    marginTop: 30,
    marginLeft: 12,
  },
  clearCachButtonContainer: {
    marginTop: 30,
    backgroundColor: 'red',
    width: 200,
    alignSelf: 'center',
  },
});

export default App;
