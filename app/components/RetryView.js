import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AuthContext from '../auth/AuthContext';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {hp, wp} from '../config/responsiveSize';
import AppButton from './AppButton';
import AppGradientBtn from './AppGradientBtn';
import AppText from './AppText';
import DisplayMesssage from './DisplayMesssage';

const RetryView = props => {
  const {retryFetch} = useContext(AuthContext);
  return (
    <TouchableOpacity onPress={retryFetch} style={styles.container}>
      <DisplayMesssage
        animatedIconSource={require('../assets/icons/animatedIcons/no-internet.json')}
        animatedIconStyles={styles.animatedIcon}
        containerStyles={styles.activityContainer}>
        <AppText style={styles.text}>
          No Internet Connection, Tap to Retry.
        </AppText>
      </DisplayMesssage>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // btnContainer: {
  //   width: '50%',
  //   height: hp(36),
  //   marginTop: 10,
  // },
  animatedIcon: {
    width: wp(380),
    height: wp(380),
    // marginTop: -100,
  },
  text: {
    color: colors.grey_dark_3,
    fontFamily: fonts.semi_bold,
    marginBottom: 120,
  },
});

export default RetryView;
