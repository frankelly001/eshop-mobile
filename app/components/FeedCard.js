import React from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import colors from '../config/colors';
import AppGradientText from './AppGradientText';
import AppText from './AppText';

const dimensions = Dimensions.get('screen');

const FeedCard = ({feed}) => {
  return (
    <View style={styles.container}>
      <View style={styles.feedContent}>
        <View style={styles.imageContainer}>
          <Image resizeMode="cover" style={styles.image} source={feed.image} />
        </View>
        <AppGradientText numberOfLines={1} style={styles.title}>
          {feed.title}
        </AppGradientText>
        <AppText numberOfLines={2} style={styles.description}>
          {feed.description}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    flex: 1,
    height: 0.3 * dimensions.height,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    marginVertical: 5,
    // marginHorizontal: 15,
  },
  feedContent: {
    alignItems: 'center',
    // justifyContent: 'flex-end',
    backgroundColor: colors.white,
    // flex: 1,
    borderRadius: 20,
    flex: 0.7,
    // position: 'absolute',
  },
  imageContainer: {
    width: 0.35 * dimensions.width,
    height: 0.35 * dimensions.width,
    overflow: 'hidden',
    borderRadius: (0.35 * dimensions.width) / 2,
    marginTop: -(0.35 * dimensions.width) / 2,
    borderWidth: 8,
    borderColor: colors.white,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 23,
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 25,
    marginBottom: 5,
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
    color: colors.grey_dark_2,
  },
});

export default FeedCard;
