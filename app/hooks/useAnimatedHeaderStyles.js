import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import colors from '../config/colors';
import {hp, wp} from '../config/responsiveSize';

const {height} = Dimensions.get('screen');
const useAnimatedHeaderStyles = (animationSwitch, inputRef) => {
  const headerLeftTranlateX = useSharedValue(0);
  const headerRightTranlateX = useSharedValue(0);
  const searchBtnStyleVal = useSharedValue(0);
  const searchBtnColor = useSharedValue(0);
  const inputWidth = useSharedValue(0);
  const inputFieldpaddingX = useSharedValue(15);
  const inputDisplay = useSharedValue('none');
  const recentSearchContainerHeight = useSharedValue(0);

  const headerLeftAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withSpring(headerLeftTranlateX.value)}],
      flex: 1,
    };
  }, []);

  const headerRightAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withSpring(headerRightTranlateX.value)}],
    };
  }, []);

  const seachBtnContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      paddingHorizontal: searchBtnStyleVal.value,
      backgroundColor: searchBtnColor.value,
      borderTopRightRadius: searchBtnStyleVal.value * 5,
      borderBottomRightRadius: searchBtnStyleVal.value * 5,
    };
  }, []);

  const inputContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      display: inputDisplay.value,
      flexDirection: 'row',
      width: inputWidth.value, // 80%
      position: 'absolute',
      right: '11%',
      justifyContent: 'flex-end',
      backgroundColor: 'orange',
      borderTopLeftRadius: 50,
      borderBottomLeftRadius: 50,
      paddingHorizontal: 15,
      backgroundColor: colors.grey_light_2,
      overflow: 'hidden',
    };
  }, []);

  const recentSearchContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      // backgroundColor: 'yellow',
      width: '100%',
      height: withTiming(recentSearchContainerHeight.value),
      zIndex: 99999,
      // position: 'absolute',
      // elevation: 10,
      top: 0,
      bottom: 0,
      left: 0,
    };
  });

  useEffect(() => {
    if (animationSwitch) {
      headerLeftTranlateX.value = -300;
      headerRightTranlateX.value = 85;
      searchBtnStyleVal.value = 10;

      searchBtnColor.value = colors.purple;
      inputWidth.value = '85%';
      inputDisplay.value = 'flex';
      inputFieldpaddingX.value = 15;
      recentSearchContainerHeight.value = height;
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
      headerLeftTranlateX.value = 0;
      headerRightTranlateX.value = 0;
      searchBtnStyleVal.value = 0;

      searchBtnColor.value = 'transparent';
      inputWidth.value = 0;
      inputDisplay.value = 'none';
      recentSearchContainerHeight.value = 0;
    }
  }, [animationSwitch]);

  return {
    headerLeftAnimatedStyle,
    headerRightAnimatedStyle,
    seachBtnContainerAnimatedStyle,
    inputContainerAnimatedStyle,
    recentSearchContainerAnimatedStyle,
  };
};

export default useAnimatedHeaderStyles;
