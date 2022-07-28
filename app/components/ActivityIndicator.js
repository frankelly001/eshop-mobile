import React from 'react';
import AnimatedLottieView from 'lottie-react-native';
import ModalOverlay from './ModalOverlay';

const ActivityIndicator = ({
  animatedIconSource = require('../assets/icons/animatedIcons/cart_loader_80x80.json'),
  containerStyles,
  animatedIconStyles,
  visible,
  portal,
}) => {
  if (!visible) return null;
  return (
    <ModalOverlay modalStyle={containerStyles} portal={portal}>
      <AnimatedLottieView
        style={animatedIconStyles}
        autoPlay
        loop
        source={animatedIconSource}
      />
    </ModalOverlay>
  );
};

export default ActivityIndicator;
