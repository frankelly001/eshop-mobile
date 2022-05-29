import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import colors from '../config/colors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {fontSz} from '../config/responsiveSize';

const AppButton = ({label, labelStyle, bgStyle, onPress, icon}) => {
  return (
    <TouchableOpacity style={[styles.container, bgStyle]} onPress={onPress}>
      {icon && (
        <FontAwesomeIcon
          size={20}
          name={icon}
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
    fontSize: fontSz(15),
    fontWeight: '600',
    color: colors.white,
  },
});

export default AppButton;
