import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Linking,
} from 'react-native';
import {About, Settings} from '../api/help';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import ListCard from '../components/ListCard';
import colors from '../config/colors';
import AppGradientBtn from '../components/AppGradientBtn';
import AppGradientText from '../components/AppGradientText';
import {fontSz, wp} from '../config/responsiveSize';
import fonts from '../config/fonts';
import Screen from '../components/Screen';
import {appNames, openSocialLink} from '../utilities/appLink';
import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  WhatsappIcon,
  YoutubeIcon,
} from '../utilities/icons';

const dimensions = Dimensions.get('screen');
const HelpScreen = props => {
  return (
    <Screen contentContainerStyle={styles.container}>
      <View style={styles.careContainer}>
        <AppButton
          bgStyle={styles.careBtn}
          label="Customer Care"
          icon="phone"
          onPress={() => Linking.openURL('tel: +2348176507344')}
        />
      </View>
      <ListCard data={Settings} />
      <ListCard data={About} />
      <View style={styles.socialContainer}>
        <AppGradientText style={styles.join}>JOIN US ON</AppGradientText>
        <View style={styles.handlesContainer}>
          <TouchableOpacity onPress={() => openSocialLink(appNames.FACEBOOK)}>
            <FacebookIcon width={wp(35)} height={wp(35)} margin={5} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openSocialLink(appNames.INSTAGRAM)}>
            <InstagramIcon width={wp(35)} height={wp(35)} margin={5} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openSocialLink(appNames.TWITTER)}>
            <TwitterIcon width={wp(35)} height={wp(35)} margin={5} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openSocialLink(appNames.YOUTUBE)}>
            <YoutubeIcon width={wp(35)} height={wp(35)} margin={5} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openSocialLink(appNames.WHATSAPP)}>
            <WhatsappIcon width={wp(35)} height={wp(35)} margin={5} />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingBottom: 60,
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
    fontSize: fontSz(10),
  },
});

export default HelpScreen;
