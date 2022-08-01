import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {About, Settings} from '../api/help';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import ListCard from '../components/ListCard';
import colors from '../config/colors';
import FacebookIcon from '../assets/icons/facebook.svg';
import InstagramIcon from '../assets/icons/instagram.svg';
import TwitterIcon from '../assets/icons/twitter.svg';
import YoutubeIcon from '../assets/icons/youtube.svg';
import AppGradientBtn from '../components/AppGradientBtn';
import AppGradientText from '../components/AppGradientText';
import {fontSz, wp} from '../config/responsiveSize';
import fonts from '../config/fonts';
import Screen from '../components/Screen';

const dimensions = Dimensions.get('screen');
const HelpScreen = props => {
  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.careContainer}>
        <AppButton
          bgStyle={styles.careBtn}
          label="Customer Care"
          icon="phone"
        />
      </View>
      <ListCard data={Settings} />
      <ListCard data={About} />
      <View style={styles.socialContainer}>
        <AppGradientText style={styles.join}>JOIN US ON</AppGradientText>
        <View style={styles.handlesContainer}>
          <TouchableOpacity>
            <FacebookIcon width={wp(35)} height={wp(35)} margin={5} />
          </TouchableOpacity>
          <TouchableOpacity>
            <InstagramIcon width={wp(35)} height={wp(35)} margin={5} />
          </TouchableOpacity>
          <TouchableOpacity>
            <TwitterIcon width={wp(35)} height={wp(35)} margin={5} />
          </TouchableOpacity>
          <TouchableOpacity>
            <YoutubeIcon width={wp(35)} height={wp(35)} margin={5} />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 60,
  },
  careContainer: {
    width: '100%',
    height: 0.13 * dimensions.height,
    // backgroundColor: colors.grey_light,
    justifyContent: 'center',
    paddingHorizontal: 60,
  },
  careBtn: {
    backgroundColor: colors.green,
  },
  socialContainer: {
    width: '100%',
    height: 0.1 * dimensions.height,
    justifyContent: 'center',
    // backgroundColor: 'yellow',
    // paddingHorizontal: 60,
  },
  handlesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  join: {
    textAlign: 'center',
    fontFamily: fonts.bold,
    marginBottom: 5,
    color: colors.purple,
    fontSize: fontSz(13),
  },
});

export default HelpScreen;
