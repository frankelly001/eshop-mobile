import React from 'react';
import {Text} from 'react-native';
import {AppStyles} from '../config/appStyles';

const AppText = ({children, style, ...otherProps}) => {
  return (
    <Text style={[AppStyles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
};

export default AppText;
