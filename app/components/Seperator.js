import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../config/colors';
import {hp} from '../config/responsiveSize';

const Seperator = props => {
  return <View style={styles.seperator} />;
};

const styles = StyleSheet.create({
  seperator: {
    width: '100%',
    minHeight: hp(0.35),
    backgroundColor: colors.grey_dark_3,
  },
});

export default Seperator;
