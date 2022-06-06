import React from 'react';
import {StyleSheet, View} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import AppText from './AppText';
import colors from '../config/colors';

const ActivityIndicator = ({
  animatedIconSource = require('../assets/icons/animatedIcons/cart_loader_80x80.json'),
  containerStyles,
  animatedIconStyles,
  visible,
}) => {
  if (!visible) return null;
  return (
    <View style={[styles.overlay, containerStyles]}>
      <AnimatedLottieView
        style={[styles.animatedIcon, animatedIconStyles]}
        autoPlay
        loop
        source={animatedIconSource}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    position: 'absolute',
    zIndex: 1,

    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
    // opacity: 0.8,
  },
  animatedIcon: {
    marginBottom: 80,
  },
});

export default ActivityIndicator;
