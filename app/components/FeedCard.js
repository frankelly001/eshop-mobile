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

const FeedCard = ({feed, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.feedContent} onPress={onPress}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{uri: feed.image}}
          />
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
    // height: hp(180),
    height: dimensions.height * 0.2,
    // backgroundColor: 'yellow',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  textContainer: {
    // backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',

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
    width: dimensions.height * 0.13,
    height: dimensions.height * 0.13,
    overflow: 'hidden',
    borderRadius: (dimensions.height * 0.13) / 2,
    marginTop: (-dimensions.height * 0.13) / 2,
    borderWidth: 5,
    borderColor: colors.white,
    zIndex: 1,
    backgroundColor: colors.grey_light,
    // flex: 1,
    // backgroundColor: 'blue',
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
  },
  description: {
    fontSize: fontSz(10),
    textAlign: 'center',
    paddingHorizontal: 15,
    marginTop: 3,
    color: colors.grey_dark_3,
  },
});

export default FeedCard;
