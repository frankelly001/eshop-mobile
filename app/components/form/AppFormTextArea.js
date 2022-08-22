import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useFormikContext} from 'formik';
import ErrorMessage from './ErrorMessage';
import AppTextarea from '../AppTextarea';
import colors from '../../config/colors';
import AnimatedFormPlaceholder from './AnimatedFormPlaceholder';

const AppFormTextArea = ({
  name,
  width = '100%',
  placeholder,
  ...otherProps
}) => {
  const {setFieldTouched, setFieldValue, values, errors, touched} =
    useFormikContext();
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={[styles.container, {width}]}>
      <AnimatedFormPlaceholder isFocus={isFocus} placeholder={placeholder} />
      <AppTextarea
        style={isFocus && {borderColor: colors.purple, borderWidth: 0.5}}
        onFocus={() => setIsFocus(true)}
        placeholder={!isFocus ? placeholder : ''}
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
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    // backgroundColor: 'red',
  },
});

export default AppFormTextArea;
