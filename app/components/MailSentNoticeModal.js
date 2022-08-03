import AnimatedLottieView from 'lottie-react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {auth} from '../api/setup/config';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontSz} from '../config/responsiveSize';
import AppGradientText from './AppGradientText';
import AppText from './AppText';
import Icon, {Icons} from './Icons';
import ModalOverlay from './ModalOverlay';

const {width} = Dimensions.get('screen');
const MailSentNoticeModal = ({visible, onClose, onHandleResendMail, email}) => {
  if (!visible) return null;

  return (
    <ModalOverlay portal>
      <TouchableOpacity
        onPress={onClose}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          width: 45,
          height: 45,
          // backgroundColor: colors.green,
          borderWidth: 1,
          borderColor: colors.grey_light,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 25,
        }}>
        <Icon
          type={Icons.MaterialCommunityIcons}
          name="close"
          color={colors.grey_light}
          size={25}
        />
      </TouchableOpacity>
      <View
        style={{
          width: width * 0.85,
          height: width * 0.85,
          backgroundColor: colors.grey_light,
          borderRadius: 20,
          padding: 10,
          marginTop: -50,
          // margin: 20,
        }}>
        <View style={{flex: 1, marginBottom: 20}}>
          <AnimatedLottieView
            autoPlay
            // loop={false}
            source={require('../assets/icons/animatedIcons/mail-sent.json')}
          />
        </View>
        <View>
          <AppText style={[styles.text, {marginBottom: 10}]}>
            We've sent an email to{' '}
            <AppText style={styles.noticableText}>{email}</AppText> to verify
            your email address, Check Inbox or Spam and activate your account.
            The link in the email will expire in 24hours.
          </AppText>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={onHandleResendMail}>
              <AppGradientText
                style={[styles.noticableText, styles.clickableLink]}>
                Click here
              </AppGradientText>
            </TouchableOpacity>
            <AppText style={[styles.text]}>
              to resend if you did not recieve an email
            </AppText>
          </View>
        </View>
      </View>
    </ModalOverlay>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.85,
    height: width * 0.85,
    backgroundColor: colors.grey_light,
    borderRadius: 20,
    padding: 10,
    marginTop: -50,
    // margin: 20,
  },
  text: {
    fontSize: fontSz(13),
    textAlign: 'center',
  },
  noticableText: {
    fontSize: fontSz(13),
    textAlign: 'center',
    fontFamily: fonts.bold,
  },
  clickableLink: {
    marginRight: 2,
  },
});

export default MailSentNoticeModal;
