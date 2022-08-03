import {useFormikContext} from 'formik';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../config/colors';
import AppSelectInput from '../AppSelectInput';
import ErrorMessage from './ErrorMessage';

const AppFormSelectInput = ({
  name,
  onHandleData,
  valueResetNames, // Array
  width = '100%',
  ...otherProps
}) => {
  const {setFieldTouched, setFieldValue, values, errors, touched} =
    useFormikContext();
  const [isFocus, setIsFocus] = useState(false);

  const data = onHandleData(values);
  // if (!data.length) return null;

  return (
    <View style={[styles.container, {width}]}>
      <AppSelectInput
        dropdownStyle={[
          !data.length && styles.dropdown,
          isFocus && {borderColor: colors.purple, borderWidth: 0.5},
        ]}
        data={data}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          setFieldTouched(name);
          setIsFocus(false);
        }}
        disable={!data.length}
        onChange={item => {
          setFieldTouched(name);
          if (item.value) setFieldValue(name, item.value);
          if (valueResetNames && item.value !== values[name]) {
            valueResetNames.map(resetName => {
              setFieldValue(resetName, '');
            });
          }
        }}
        value={values[name]}
        labelField="label"
        valueField="value"
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
  dropdown: {
    opacity: 0.2,
  },
});

export default AppFormSelectInput;
