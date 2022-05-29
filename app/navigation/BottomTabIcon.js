import React from 'react';
import {StyleSheet, View} from 'react-native';
import {wp} from '../config/responsiveSize';

const BottomTabIcon = ({size, focused, ActiveIcon, InActiveIcon}) => {
  // default size: 25
  // if (focused) return <ActiveIcon width={wp(size)} height={wp(size)} />;
  // return <InActiveIcon width={wp(size)} height={wp(size)} />;
  if (focused) return <ActiveIcon width={size} height={size} />;
  return <InActiveIcon width={size} height={size} />;
};

export default BottomTabIcon;
