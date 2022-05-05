import React from 'react';
import { Dimensions, StyleSheet, ScrollView, Text, View } from 'react-native';
import { CachedImage } from '@georstat/react-native-image-cache';

const prefetchImage =
  'https://upload.wikimedia.org/wikipedia/commons/0/02/Oia_dal_battello_al_tramonto_-_Santorini_-_Grecia_-_agosto_2018.jpg';

const prefetchImageTwo =
  'https://upload.wikimedia.org/wikipedia/commons/4/48/Thira_%28Santorini%29_-_Ia-01.jpg';

const prefetchImageThree =
  'https://upload.wikimedia.org/wikipedia/commons/3/37/Oia_sunset_-_panoramio_%282%29.jpg';

const PrefetchImage = () => {
  return (
    <ScrollView contentContainerStyle={styles.cachedImageContainer}>
      <Text style={styles.header}> Single</Text>
      <View style={{ marginTop: 12 }}>
        {/* source and thumbnailSource props are the same, no need to enter thumbnail since image is already cached */}
        <CachedImage
          resizeMode="cover"
          source={prefetchImage}
          style={styles.image}
          thumbnailSource={prefetchImage}
        />
      </View>
      <Text style={styles.header}>Multiple</Text>
      {[prefetchImageTwo, prefetchImageThree].map(image => (
        <View style={{ marginTop: 12 }} key={image}>
          {/* source and thumbnailSource props are the same, no need to enter */}
          {/* thumbnail since image is already cached */}
          <CachedImage
            resizeMode="cover"
            source={image}
            style={styles.image}
            thumbnailSource={image}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cachedImageContainer: {
    alignItems: 'center',
    paddingBottom: 48,
  },
  header: {
    fontSize: 18,
    marginTop: 24,
  },
  image: {
    alignSelf: 'center',
    height: 250,
    width: Dimensions.get('screen').width - 40,
  },
});

export default PrefetchImage;
