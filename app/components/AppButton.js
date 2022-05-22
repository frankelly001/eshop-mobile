import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import colors from '../config/colors';

const AppButton = ({label, labelStyle, bgStyle, onPress, icon}) => {
  return (
    <TouchableOpacity style={[styles.container, bgStyle]} onPress={onPress}>
      {icon && (
        <FontAwesomeIcon
          size={20}
          icon={icon}
          color={colors.white}
          style={{marginRight: 10}}
        />
      )}
      <Text style={[styles.Text, labelStyle]}>{label}</Text>
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
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
});

export default AppButton;
