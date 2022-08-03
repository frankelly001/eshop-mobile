import React, {useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontSz, hp} from '../config/responsiveSize';

const AppTextInput = ({style, inputRef, ...otherProps}) => {
  const [focused, setFocused] = useState(false);
  return (
    // <View style={styles.container}>
    <TextInput
      ref={inputRef}
      onFocus={() => setFocused(!focused)}
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
    borderRadius: 20,
    backgroundColor: colors.grey_light_2,
    paddingVertical: 5,
    paddingHorizontal: 15,
    // height: hp(36),
    fontSize: fontSz(15),
    fontFamily: fonts.regular,
    textDecorationLine: 'none',
  },
});

export default AppTextInput;
