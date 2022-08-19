import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../config/colors';
import {hp} from '../config/responsiveSize';

const Seperator = ({color}) => {
  return <View style={[styles.seperator, {backgroundColor: color}]} />;
};

const styles = StyleSheet.create({
  seperator: {
    width: '100%',
    minHeight: hp(0.5),
    backgroundColor: colors.grey_dark_3,
  },
});

export default Seperator;
