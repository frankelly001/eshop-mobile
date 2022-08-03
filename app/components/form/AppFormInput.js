import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFormikContext} from 'formik';
import AppTextInput from '../AppTextInput';
import ErrorMessage from './ErrorMessage';
import colors from '../../config/colors';

const AppFormInput = ({name, width = '100%', style, ...otherProps}) => {
  const {setFieldTouched, setFieldValue, values, errors, touched} =
    useFormikContext();
  const [isFocus, setIsFocus] = useState(false);
  // console.log(touched);
  // console.log(errors);
  return (
    // <>
    <View style={[styles.container, {width}]}>
      <AppTextInput
        style={isFocus && {borderColor: colors.purple, borderWidth: 0.5}}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          setFieldTouched(name);
          setIsFocus(false);
        }}
        // onChangeText={handleChange(name)}
        onChangeText={text => setFieldValue(name, text)}
        value={values[name]}
        // width={width}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
    // </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    // backgroundColor: 'red',
  },
});

export default AppFormInput;
