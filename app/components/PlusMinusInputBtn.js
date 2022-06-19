import React, {useState, useContext, useEffect, memo} from 'react';
import {StyleSheet, View, TextInput, Dimensions} from 'react-native';
import AuthContext from '../auth/AuthContext';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontSz, hp, wp} from '../config/responsiveSize';
import AppButton from './AppButton';
import AppGradientBtn from './AppGradientBtn';
import AppText from './AppText';

const dimensions = Dimensions.get('screen');

const PlusMinusInputBtn = ({
  value = 1,
  dispatchAdd,
  dispatchSub,
  dispatchInput,
  resetVal,
  onSetResetVal,
  getValue,
  small,
}) => {
  const [val, setVal] = useState(value);
  const {dispatch} = useContext(AuthContext);

  const handleChange = newVal => {
    setVal(newVal ? parseInt(newVal) : newVal);
    if (dispatchInput) dispatch({...dispatchInput, payload: newVal});
  };
  // console.log(val);

  const add = () => {
    setVal(parseInt(val + 1));
    if (dispatchAdd) dispatch(dispatchAdd);
  };

  const sub = () => {
    setVal(val > 1 ? val - 1 : val);
    if (dispatchSub) dispatch(dispatchSub);
  };

  useEffect(() => {
    if (resetVal) {
      setVal(1);
      onSetResetVal(false);
    }
    return function cleanUp() {};
  }, [resetVal]);

  useEffect(() => {
    if (getValue) getValue(val);
    return function cleanUp() {};
  }, [val]);

  useEffect(() => {
    if (value > 1) setVal(value);
    return function cleanUp() {};
  }, [value]);

  const styles = small ? smallStyles : bigStyles;

  return (
    <View style={styles.container}>
      <AppGradientBtn
        label="－" // －	Fullwidth Hyphen-minus	&#65293;	&#xFF0D;
        style={[styles.btn, styles.leftBtn]}
        labelStyle={styles.btnLabel}
        onPress={sub}
        width={small ? '20%' : '15%'}
      />
      <TextInput
        value={`${val}`}
        keyboardType="numeric"
        style={styles.input}
        onChangeText={text => handleChange(text)}
        // defaultValue={'1'}
      />
      <AppGradientBtn
        label="＋" // ＋	Fullwidth Plus Sign	&#65291;	&#xFF0B;
        style={[styles.btn, styles.rightBtn]}
        labelStyle={styles.btnLabel}
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
    textAlign: 'center',
    fontSize: fontSz(18),
    fontFamily: fonts.bold,
    color: colors.black,
    // paddingVertical: fontSz(8),
    paddingVertical: hp(7.5),
  },
  btn: {
    backgroundColor: colors.purple,
    // width: '15%',
    flex: 1,
    padding: 0,
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
  },
  input: {
    backgroundColor: colors.grey_light_2,
    flex: 5,
    textAlign: 'center',
    fontSize: fontSz(15),
    fontFamily: fonts.bold,
    color: colors.black,
    padding: 0,
  },
  btn: {
    backgroundColor: colors.purple,
    // width: '%',
    flex: 5,
    padding: 0,
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
