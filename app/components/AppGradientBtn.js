import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontSz, hp} from '../config/responsiveSize';
import AppText from './AppText';

const AppGradientBtn = ({
  label,
  labelStyle,
  style,
  containerStyle,
  onPress,
  width = '100%',
  inActive,
  disable,
}) => {
  const color = !inActive
    ? ['#5d05b5', '#9E1E7C', '#dc3545']
    : ['#5d05b5a2', '#dc3545a2'];
  return (
    <TouchableOpacity
      style={[styles.container, {width}, containerStyle]}
      disabled={disable}
      onPress={onPress}>
      <LinearGradient
        colors={['#5d05b5', '#9E1E7C', '#dc3545']}
        style={[styles.gradientContainer, style, inActive && {opacity: 0.5}]}
        // start={{x: 0.494, y: 0}}
        // end={{x: 0.5, y: 0.95}}

        locations={[0.1, 0.7, 1]}
        useAngle={true}
        angle={179.63}
        angleCenter={{x: 0.5, y: 0.3}}>
        <AppText style={[styles.text, labelStyle]}>{label}</AppText>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    // height: '100%',
  },
  text: {
    // fontSize: fontSz(15),
    fontFamily: fonts.bold,
    color: colors.white,
  },
});

export default AppGradientBtn;

{
  /* <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={['#5d05b5', '#9E1E7C', '#dc3545']}
        style={styles.gradientContainer}
        // start={{x: 0.494, y: 0}}
        // end={{x: 0.5, y: 0.95}}

        locations={[0.1, 0.52, 1]}
        useAngle={true}
        angle={179.65}
        angleCenter={{x: 0.5, y: 0.45}}>
        <AppText style={[styles.text, labelStyle]}>{label}</AppText>
      </LinearGradient>
    </TouchableOpacity> */
}
