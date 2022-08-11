import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import colors from '../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {fontSz} from '../config/responsiveSize';
import fonts from '../config/fonts';
import AppText from './AppText';

const AppButton = ({label, labelStyle, bgStyle, onPress, icon}) => {
  return (
    <TouchableOpacity style={[styles.container, bgStyle]} onPress={onPress}>
      {icon && (
        <MaterialCommunityIcons
          size={20}
          name={icon}
          color={colors.white}
          style={{marginRight: 10}}
        />
      )}
      <AppText style={[styles.Text, labelStyle]}>{label}</AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.purple,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 30,
  },
  Text: {
    fontFamily: fonts.bold,
    color: colors.white,
  },
});

export default AppButton;
