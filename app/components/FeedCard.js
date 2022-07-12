import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontSz, hp, wp} from '../config/responsiveSize';
import AppGradientText from './AppGradientText';
import AppText from './AppText';

const dimensions = Dimensions.get('screen');

const FeedCard = ({feed}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.feedContent}>
        <View style={styles.imageContainer}>
          <Image resizeMode="cover" style={styles.image} source={feed.image} />
        </View>
        <AppGradientText numberOfLines={1} style={styles.title}>
          {feed.title}
        </AppGradientText>
        <AppText numberOfLines={2} style={styles.description}>
          {feed.description}
        </AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    flex: 1,
    height: wp(180),
    // backgroundColor: 'yellow',zz
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  feedContent: {
    alignItems: 'center',
    // justifyContent: 'flex-end',
    backgroundColor: colors.white,
    // flex: 1,
    borderRadius: 20,
    flex: 0.65,
    // position: 'absolute',
  },
  imageContainer: {
    width: wp(120),
    height: wp(120),
    overflow: 'hidden',
    borderRadius: wp(120) / 2,
    marginTop: -wp(120) / 2,
    borderWidth: 5,
    borderColor: colors.white,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: fontSz(20),
    fontFamily: fonts.bold,
    textAlign: 'center',
    marginBottom: 3,
  },
  description: {
    fontSize: fontSz(13),
    textAlign: 'center',
    paddingHorizontal: 15,
    // marginBottom: 15,
    color: colors.grey_dark_2,
  },
});

export default FeedCard;
