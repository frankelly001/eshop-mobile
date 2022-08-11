import React from 'react';
import {StyleSheet} from 'react-native';
import colors from '../../config/colors';
import {fontSz} from '../../config/responsiveSize';
import AppText from '../AppText';

const PaymentNotice = props => {
  return (
    <>
      <AppText style={styles.notice}>
        By tapping "PAY NOW" I accept eShop´s{' '}
        <AppText style={[styles.notice, styles.noticeLink]}>
          Payment Terms & Conditions, General Terms and Conditions{' '}
        </AppText>
        , and{' '}
        <AppText style={[styles.notice, styles.noticeLink]}>
          Privacy and Cookie Notice
        </AppText>
      </AppText>

      <AppText style={styles.notice}>
        Please note: eShop will never ask you for your password, PIN, CVV or
        full card details over the phone or via email. Need help?{' '}
        <AppText style={[styles.notice, styles.noticeLink]}>
          Contact us on https://www.eShop.com.ng/contact/.
        </AppText>
      </AppText>
    </>
  );
};

const styles = StyleSheet.create({
  notice: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: fontSz(10.5),
  },
  noticeLink: {
    color: colors.purple,
  },
});

export default PaymentNotice;
