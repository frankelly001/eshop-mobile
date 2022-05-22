import React from 'react';
import {StyleSheet, View} from 'react-native';

const BottomTabIcon = ({size, focused, ActiveIcon, InActiveIcon}) => {
  // default size: 25
  if (focused) return <ActiveIcon width={size} height={size} />;
  return <InActiveIcon width={size} height={size} />;
};

export default BottomTabIcon;
