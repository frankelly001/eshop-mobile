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
import LinearGradient from 'react-native-linear-gradient';
import {LinearTextGradient} from 'react-native-text-gradient';
import AppGradientBtn from '../components/AppGradientBtn';
import AppGradientText from '../components/AppGradientText';
import {fontSz, wp} from '../config/responsiveSize';

const dimensions = Dimensions.get('screen');
const HelpScreen = props => {
  return (
    <View style={styles.container}>
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
            <FacebookIcon width={wp(40)} height={wp(40)} margin={5} />
          </TouchableOpacity>
          <TouchableOpacity>
            <InstagramIcon width={wp(40)} height={wp(40)} margin={5} />
          </TouchableOpacity>
          <TouchableOpacity>
            <TwitterIcon width={wp(40)} height={wp(40)} margin={5} />
          </TouchableOpacity>
          <TouchableOpacity>
            <YoutubeIcon width={wp(40)} height={wp(40)} margin={5} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
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
    fontWeight: '700',
    marginBottom: 5,
    color: colors.purple,
    fontSize: fontSz(13),
  },
});

export default HelpScreen;
