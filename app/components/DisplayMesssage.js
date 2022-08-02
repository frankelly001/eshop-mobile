import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
import ModalOverlay from './ModalOverlay';

const DisplayMesssage = ({
  animatedIconSource,
  containerStyles,
  animatedIconStyles,
  children,
}) => {
  return (
    <ModalOverlay modalStyle={[styles.container, containerStyles]}>
      <AnimatedLottieView
        style={animatedIconStyles}
        autoPlay
        loop
        source={animatedIconSource}
      />
      {children}
    </ModalOverlay>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});

export default DisplayMesssage;
