import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, TextInput, Dimensions} from 'react-native';
import AuthContext from '../auth/AuthContext';
import colors from '../config/colors';
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
    if (dispatchInput) dispatch({...dispatchInput, payload: inputVal});
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
        // label="–"
        label="－" // －	Fullwidth Hyphen-minus	&#65293;	&#xFF0D;
        style={[styles.btn, styles.leftBtn]}
        labelStyle={styles.btnLabel}
        onPress={sub}
        width="15%"
        // width="15%"
      />
      {/* <View> */}
      <TextInput
        value={`${val}`}
        keyboardType="numeric"
        style={styles.input}
        onChangeText={text => handleChange(text)}
        // defaultValue={'1'}
      />
      {/* </View> */}
      <AppGradientBtn
        label="＋" // ＋	Fullwidth Plus Sign	&#65291;	&#xFF0B;
        style={[styles.btn, styles.rightBtn]}
        labelStyle={styles.btnLabel}
        onPress={add}
        width="15%"
      />
    </View>
  );
};

const bigStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    // height: 0.05 * dimensions.height,
    // backgroundColor: 'red',
    // flex: 1,
  },
  input: {
    backgroundColor: colors.grey_light_2,
    // paddingHorizontal: 20,
    // width: '70%',
    flex: 5,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    paddingVertical: 8,
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
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    // backgroundColor: 'blue',
    // padding: 0,
  },
});

const smallStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    // height: 0.05 * dimensions.height,
    backgroundColor: 'red',
    // flex: 1,
  },
  input: {
    backgroundColor: colors.grey_light_2,
    // paddingHorizontal: 20,
    // width: '100%',
    flex: 2,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
    paddingVertical: 1,
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
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    // backgroundColor: 'blue',
    // padding: 0,
  },
});

export default PlusMinusInputBtn;

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
