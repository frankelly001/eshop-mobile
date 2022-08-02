import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../components/AppText';
import DisplayMesssage from '../components/DisplayMesssage';
import Screen from '../components/Screen';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {wp} from '../config/responsiveSize';

const NotificationScreen = props => {
  return (
    // <Screen contentContainerStyle={styles.container}>
    <DisplayMesssage
      animatedIconSource={require('../assets/icons/animatedIcons/sleepy-cat-no-notification.json')}
      animatedIconStyles={styles.animatedIcon}
      containerStyles={styles.activityContainer}>
      <AppText style={styles.text}>No Notifications</AppText>
    </DisplayMesssage>
    // </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedIcon: {
    width: wp(380),
    height: wp(380),
  },
  activityContainer: {
    // marginBottom: 60,
    backgroundColor: colors.white,
    // opacity: 1,
  },
  text: {
    // fontSize: fontSz(15),\
    fontFamily: fonts.semi_bold,
    color: colors.grey_dark_3,
    marginBottom: 100,
  },
});

export default NotificationScreen;
