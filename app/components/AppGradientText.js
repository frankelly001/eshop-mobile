import React from 'react';
import {StyleSheet, Text} from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import fonts from '../config/fonts';

const AppGradientText = ({children, style}) => {
  return (
    <MaskedView
      maskElement={
        <AppText style={[style, {backgroundColor: 'transparent'}]}>
          {children}
        </AppText>
      }>
      <LinearGradient
        colors={['#5d05b5', '#9E1E7C', '#dc3545']}
        locations={[0.15, 0.52, 1]}
        useAngle={true}
        angle={178.0}
        angleCenter={{x: 0.5, y: 0.3}}>
        <AppText style={[style, {opacity: 0}]}>{children}</AppText>
      </LinearGradient>
    </MaskedView>
  );
};

export default AppGradientText;

// <LinearTextGradient
//   style={style}
//   //   locations={[0.2, 0.52, 1]}
//   locations={[0.1, 0.52, 1]}
//   colors={['#5d05b5', '#9E1E7C', '#dc3545']}
//   start={{x: 0.494, y: 0}}
//   end={{x: 0.5, y: 0.95}}>
//   <Text>{children}</Text>
// </LinearTextGradient>
// <AppText style={[style, {color: colors.purple}]}>
//   <Text>{children}</Text>
// </AppText>
