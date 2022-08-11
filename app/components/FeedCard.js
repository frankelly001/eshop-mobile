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
        <View style={styles.textContainer}>
          <AppGradientText numberOfLines={1} style={styles.title}>
            {feed.title}
          </AppGradientText>
          <AppText numberOfLines={1} style={styles.description}>
            {feed.description}
          </AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: '100%',
    // flex: 1,
    height: hp(180),
    // height: dimensions.height * 0.2,
    // backgroundColor: 'yellow',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  textContainer: {
    // backgroundColor: 'red',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
    // position: 'absolute',
    // bottom: 10,
  },
  feedContent: {
    alignItems: 'center',
    // height: hp(120),
    flex: 0.7,
    // justifyContent: 'flex-end',
    backgroundColor: colors.white,
    // backgroundColor: colors.purple,
    // flex: 1,
    borderRadius: 20,
    // flex: 0.6,
    // position: 'absolute',
  },
  imageContainer: {
    width: wp(120),
    height: wp(120),
    overflow: 'hidden',
    borderRadius: hp(120) / 2,
    marginTop: -hp(120) / 2,
    borderWidth: 5,
    borderColor: colors.white,
    zIndex: 1,
    // flex: 1,
    backgroundColor: 'blue',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    // fontSize: fontSz(20),
    fontSize: fontSz(13),
    fontFamily: fonts.bold,
    textAlign: 'center',
    marginBottom: 3,
  },
  description: {
    fontSize: fontSz(10),
    textAlign: 'center',
    paddingHorizontal: 15,
    // marginBottom: 15,
    color: colors.grey_dark_3,
  },
});

export default FeedCard;
