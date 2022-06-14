import {useFormikContext} from 'formik';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {fontSz} from '../../config/responsiveSize';
import AppGradientBtn from '../AppGradientBtn';

const SubmitButton = ({onSaveValues, ...otherProps}) => {
  const {handleSubmit, values, isValid} = useFormikContext();
  const submit = () => {
    handleSubmit();
    if (onSaveValues) isValid && onSaveValues(values);
  };
  return (
    <AppGradientBtn
      // style={{opacity: isValid ? 1 : 0.5}}
      {...otherProps}
      onPress={submit}
    />
  );
};

export default SubmitButton;
