import React from 'react';
import {StyleSheet, Text} from 'react-native';
import AppGradientText from '../components/AppGradientText';
import colors from '../config/colors';
import fonts from '../config/fonts';

const BottomTabLabel = ({children, focused}) => {
  return focused ? (
    <AppGradientText style={[styles.text, styles.gradientText]}>
      {children}
    </AppGradientText>
  ) : (
    <Text style={styles.text}>{children}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 10,
    color: colors.black,
  },
  gradientText: {
    fontFamily: fonts.bold,
  },
});

export default BottomTabLabel;
