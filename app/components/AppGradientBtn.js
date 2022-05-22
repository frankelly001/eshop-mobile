import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../config/colors';
import AppText from './AppText';

const AppGradientBtn = ({
  label,
  labelStyle,
  style,
  onPress,
  width = '100%',
}) => {
  return (
    <TouchableOpacity style={{width}} onPress={onPress}>
      <LinearGradient
        colors={['#5d05b5', '#9E1E7C', '#dc3545']}
        style={[styles.gradientContainer, style]}
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
    borderRadius: 30,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '600',
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
