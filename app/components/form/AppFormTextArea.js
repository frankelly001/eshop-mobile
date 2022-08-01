import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useFormikContext} from 'formik';
import ErrorMessage from './ErrorMessage';
import AppTextarea from '../AppTextarea';

const AppFormTextArea = ({name, width = '100%', ...otherProps}) => {
  const {setFieldTouched, setFieldValue, values, errors, touched} =
    useFormikContext();
  return (
    <View style={[styles.container, {width}]}>
      <AppTextarea
        onBlur={() => setFieldTouched(name)}
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
