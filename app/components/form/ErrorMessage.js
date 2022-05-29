import React from 'react';
import {StyleSheet} from 'react-native';
import colors from '../../config/colors';
import {fontSz} from '../../config/responsiveSize';
import AppText from '../AppText';

const ErrorMessage = ({error, visible}) => {
  if (!visible || !error) return null;

  return <AppText style={styles.error}>{error}</AppText>;
};

const styles = StyleSheet.create({
  error: {
    color: colors.red_dark,
    fontSize: fontSz(13),
    paddingHorizontal: 20,
  },
});

export default ErrorMessage;
