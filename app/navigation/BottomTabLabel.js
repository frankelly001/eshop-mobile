import React from 'react';
import {StyleSheet, Text} from 'react-native';
import AppGradientText from '../components/AppGradientText';
import colors from '../config/colors';

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
    fontWeight: '700',
  },
});

export default BottomTabLabel;
