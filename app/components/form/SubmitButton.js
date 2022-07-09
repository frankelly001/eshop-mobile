import {useFormikContext} from 'formik';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {fontSz} from '../../config/responsiveSize';
import AppGradientBtn from '../AppGradientBtn';

const SubmitButton = ({onSaveValues, ...otherProps}) => {
  const {handleSubmit} = useFormikContext();

  return <AppGradientBtn {...otherProps} onPress={handleSubmit} />;
};

export default SubmitButton;
