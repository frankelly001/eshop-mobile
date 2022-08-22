import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {useAnimatedStyle, withSpring} from 'react-native-reanimated';
import colors from '../../config/colors';
import fonts from '../../config/fonts';
import {fontSz} from '../../config/responsiveSize';

const AnimatedFormPlaceholder = ({isFocus, placeholder}) => {
  const placeholderStyle = useAnimatedStyle(() => {
    if (isFocus)
      return {
        opacity: 1,
        transform: [{translateY: withSpring(0)}],
        display: 'flex',
      };
    return {
      // transform: [{translateX: withSpring(headerRightTranlateX.value)}],
      opacity: 0,
      transform: [{translateY: withSpring(30)}],
      display: 'none',
    };
  }, [isFocus]);

  return (
    <Animated.Text style={[styles.placeholder, placeholderStyle]}>
      {placeholder}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    fontSize: fontSz(10),
    color: colors.black,
    fontFamily: fonts.regular,
    marginBottom: 5,
    paddingHorizontal: 15,
  },
});

export default AnimatedFormPlaceholder;
