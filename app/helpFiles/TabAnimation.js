import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity, Animated} from 'react-native';
import colors from '../config/colors';
import * as Animatable from 'react-native-animatable';
import AppText from '../components/AppText';
import fonts from '../config/fonts';

const TabButton = ({
  onPress,
  accessibilityState,
  ActiveIcon,
  InActiveIcon,
  label,
}) => {
  const focused = accessibilityState.selected;
  // const viewRef = useRef(null);
  // const textViewRef = useRef(null);
  const viewScale = useRef(new Animated.Value(0)).current;
  const textScale = useRef(new Animated.Value(0)).current;

  // useEffect(() => {
  if (focused) {
    // 0.3: { scale: .7 }, 0.5: { scale: .3 }, 0.8: { scale: .7 },
    // viewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
    // textViewRef.current.animate({0: {scale: 0}, 1: {scale: 1}});
    Animated.spring(viewScale, {
      toValue: 0.5,
      duration: 150,
      useNativeDriver: true,
    }).start();
    Animated.spring(viewScale, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.spring(textScale, {
      toValue: 0.5,
      duration: 150,
      useNativeDriver: true,
    }).start();
    Animated.spring(textScale, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  } else {
    // viewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
    // textViewRef.current.animate({0: {scale: 1}, 1: {scale: 0}});
    Animated.spring(viewScale, {
      toValue: 1,
      duration: 159,
      useNativeDriver: true,
    }).start();
    Animated.spring(viewScale, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.spring(textScale, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
    Animated.spring(textScale, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }
  // }, [focused]);

  const Icon = focused ? ActiveIcon : InActiveIcon;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, {flex: focused ? 1 : 0.7}]}>
      <View>
        <Animated.View
          // ref={viewScale}
          style={[
            StyleSheet.absoluteFillObject,
            {transform: [{scale: viewScale}]},
            {backgroundColor: colors.purple_Transparent, borderRadius: 20},
          ]}
        />
        <View
          style={[
            styles.btn,
            {backgroundColor: focused ? null : colors.purple_Transparent},
          ]}>
          <Icon width={23} height={23} />

          <Animated.View style={{transform: [{scale: textScale}]}}>
            {focused && (
              <AppText
                style={{
                  color: colors.white,
                  fontSize: 10,
                  fontFamily: fonts.bold,
                  paddingHorizontal: 8,
                }}>
                {label}
              </AppText>
            )}
          </Animated.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 16,
  },
});

export default TabButton;
