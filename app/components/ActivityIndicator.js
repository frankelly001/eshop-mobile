import React from 'react';
import {StyleSheet, View} from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import AppText from './AppText';
import colors from '../config/colors';
import {Portal} from 'react-native-portalize';

const ActivityIndicator = ({
  animatedIconSource = require('../assets/icons/animatedIcons/cart_loader_80x80.json'),
  containerStyles,
  animatedIconStyles,
  visible,
  portal,
}) => {
  if (!visible) return null;
  const Container = portal ? Portal : React.Fragment;
  return (
    <Container>
      <View style={[styles.overlay, containerStyles]}>
        <AnimatedLottieView
          style={animatedIconStyles}
          autoPlay
          loop
          source={animatedIconSource}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grey_dark_3_tranparent,
    position: 'absolute',
    zIndex: 1,
  },
});

export default ActivityIndicator;
