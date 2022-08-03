import React, {useState, useContext, useEffect, memo} from 'react';
import {StyleSheet, View, TextInput, Dimensions} from 'react-native';
import AuthContext from '../auth/AuthContext';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontSz, hp, wp} from '../config/responsiveSize';
import AppButton from './AppButton';
import AppGradientBtn from './AppGradientBtn';
import AppText from './AppText';

// const dimensions = Dimensions.get('screen');

const PlusMinusInputBtn = ({
  value = 1,
  add,
  sub,
  onChangeText,
  onBlur,
  small,
}) => {
  const styles = small ? smallStyles : bigStyles;

  return (
    <View style={styles.container}>
      <AppGradientBtn
        label="－" // －	Fullwidth Hyphen-minus	&#65293;	&#xFF0D;
        style={[styles.btn, styles.leftBtn]}
        containerStyle={styles.btnContainer}
        labelStyle={styles.btnLabel}
        onPress={sub}
        width={small ? '20%' : '15%'}
      />
      <TextInput
        value={`${value}`}
        keyboardType="numeric"
        style={styles.input}
        onChangeText={onChangeText}
        onBlur={onBlur}
        // defaultValue={'1'}
      />
      <AppGradientBtn
        label="＋" // ＋	Fullwidth Plus Sign	&#65291;	&#xFF0B;
        style={[styles.btn, styles.rightBtn]}
        labelStyle={styles.btnLabel}
        containerStyle={styles.btnContainer}
        onPress={add}
        width={small ? '20%' : '15%'}
      />
    </View>
  );
};

const bigStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  input: {
    backgroundColor: colors.grey_light_2,
    flex: 5,
    // width: '100%',
    textAlign: 'center',
    fontSize: fontSz(18),
    fontFamily: fonts.bold,
    color: colors.black,
    padding: 0,
    paddingHorizontal: 10,
    paddingVertical: 6.5,
    // height: '100%',
  },
  btn: {
    backgroundColor: colors.purple,
    // width: '15%',
    flex: 1,
    padding: 0,
    // height: '100%',
  },
  btnContainer: {
    // height: '100%',
  },
  leftBtn: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  rightBtn: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  btnLabel: {
    fontSize: fontSz(15),
    fontWeight: '700',
    textAlign: 'center',
  },
});

const smallStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    // height: hp(28),
  },
  input: {
    backgroundColor: colors.grey_light_2,
    flex: 5,
    textAlign: 'center',
    fontSize: fontSz(15),
    fontFamily: fonts.bold,
    color: colors.black,
    padding: 0,
    paddingHorizontal: 5,
    // height: '100%',
  },
  btn: {
    backgroundColor: colors.purple,
    // width: '%',
    flex: 5,
    padding: 0,
  },
  btnContainer: {
    // height: '100%',
  },
  leftBtn: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  rightBtn: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  btnLabel: {
    fontSize: fontSz(13),
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default memo(PlusMinusInputBtn);

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     width: '100%',
//   },
//   input: {
//     backgroundColor: colors.grey_light_2,
//     paddingHorizontal: 20,
//     width: '70%',
//     textAlign: 'center',
//     fontSize: 20,
//     fontWeight: '600',
//     paddingVertical: 8,
//   },
//   btn: {
//     backgroundColor: colors.purple,
//     // width: '15%',
//     flex: 1,
//   },
//   leftBtn: {
//     borderTopRightRadius: 0,
//     borderBottomRightRadius: 0,
//   },
//   rightBtn: {
//     borderTopLeftRadius: 0,
//     borderBottomLeftRadius: 0,
//   },
//   btnLabel: {
//     fontSize: 30,
//     fontWeight: '600',
//     position: 'absolute',
//   },
// });
