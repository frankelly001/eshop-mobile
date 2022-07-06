import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontSz} from '../config/responsiveSize';

const AppTextInput = ({style, inputRef, ...otherProps}) => {
  return (
    // <View style={styles.container}>
    <TextInput
      ref={inputRef}
      style={[styles.inputField, style]}
      placeholderTextColor={colors.grey_dark}
      {...otherProps}
    />
    // </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   marginVertical: 10,
  // },
  inputField: {
    borderRadius: 50,
    backgroundColor: colors.grey_light_2,
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontSize: fontSz(15),
    fontFamily: fonts.regular,
    textDecorationLine: 'none',
  },
});

export default AppTextInput;
