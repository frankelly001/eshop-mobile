import React from 'react';
import {Text} from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
// import {LinearTextGradient} from 'react-native-text-gradient';

const AppGradientText = ({children, style}) => {
  return (
    // <LinearTextGradient
    //   style={style}
    //   //   locations={[0.2, 0.52, 1]}
    //   locations={[0.1, 0.52, 1]}
    //   colors={['#5d05b5', '#9E1E7C', '#dc3545']}
    //   start={{x: 0.494, y: 0}}
    //   end={{x: 0.5, y: 0.95}}>
    //   <Text>{children}</Text>
    // </LinearTextGradient>
    <AppText style={[style, {color: colors.purple}]}>
      <Text>{children}</Text>
    </AppText>
  );
};

export default AppGradientText;
