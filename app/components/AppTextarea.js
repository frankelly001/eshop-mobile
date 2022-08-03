import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontSz, hp} from '../config/responsiveSize';

const AppTextarea = ({style, ...otherProps}) => {
  return (
    // <View style={styles.textAreaContainer}>
    <TextInput
      style={[styles.textArea, style]}
      underlineColorAndroid="transparent"
      placeholderTextColor={colors.grey_dark}
      numberOfLines={10}
      multiline={true}
      {...otherProps}
    />
    // </View>
  );
};

const styles = StyleSheet.create({
  textAreaContainer: {
    // width: '100%',
    // justifyContent: 'flex-start',
  },
  textArea: {
    // borderWidth: 1,
    // borderColor: colors.green,
    borderRadius: 15,
    height: hp(100),
    justifyContent: 'flex-start',
    fontSize: fontSz(15),
    fontFamily: fonts.regular,
    paddingVertical: 10,
    paddingHorizontal: 15,
    textAlignVertical: 'top',
    backgroundColor: colors.grey_light_2,
  },
});

export default AppTextarea;
