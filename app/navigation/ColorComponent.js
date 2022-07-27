import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';

const Colors = {
  primary: '#637aff',
  primaryDark: '#2759ff',
  primaryLite: '#637aff99',
  black: '#000',
  white: 'white',
  accent: '#112233',
  green: '#60c5a8',
  green2: '#039a83',
  light: '#EEEEEE',
  dark: '#333',
  gray: '#CCCCCC',
  red: '#ff2f68',
  lightRed: '#ff4f7e',
  darkRed: '#d9365e',
  purple: '#8f06e4',
  skyBlue: 'skyblue',
  yellow: '#f8c907',
  pink: '#ff4c98',
  gold: 'gold',
  line: '#282C35',
  //   gray: '#CCCCCC',
  darkGray: '#999999',

  darkOverlayColor: 'rgba(0, 0, 0, 0.4)',
  darkOverlayColor2: 'rgba(0, 0, 0, 0.8)',
  lightOverlayColor: 'rgba(255, 255, 255, 0.6)',
  primaryAlpha: 'rgba(99, 122, 255, 0.15)',
  redAlpha: 'rgba(255, 84, 84, 0.15)',
  greenAlpha: 'rgba(96, 197, 168, 0.15)',
  purpleAlpha: 'rgba(146, 6, 228, 0.15)',

  // bags background colors
  bag1Bg: '#ea7a72',
  bag2Bg: '#c2c5d1',
  bag3Bg: '#82a7c9',
  bag4Bg: '#d49d8f',
  bag5Bg: '#ccd9c6',
  bag6Bg: '#767676',
  bag7Bg: '#d1c8c3',
  bag8Bg: '#dca47f',
  bag9Bg: '#eb849c',
  bag10Bg: '#979dc1',
  bag11Bg: '#c7d3c0',
};

const ColorComponent = ({route, navigation}) => {
  const viewRef = React.useRef(null);
  const [bgColor, setBgColor] = useState();

  //   useEffect(() => {
  //     switch (route.name) {
  //       case 'Home': {
  //         setBgColor(Colors.primary);
  //         break;
  //       }
  //       case 'Search': {
  //         setBgColor(Colors.green);
  //         break;
  //       }
  //       case 'Add': {
  //         setBgColor(Colors.red);
  //         break;
  //       }
  //       case 'Account': {
  //         setBgColor(Colors.purple);
  //         break;
  //       }
  //       case 'Like': {
  //         setBgColor(Colors.yellow);
  //         break;
  //       }
  //       default:
  //         setBgColor(Colors.white);
  //     }
  //   }, []);
  //   useEffect(() => {
  //     const unsubscribe = navigation.addListener('focus', () => {
  //       viewRef.current.animate({0: {opacity: 0.5}, 1: {opacity: 1}});
  //     });
  //     return () => unsubscribe;
  //   }, [navigation]);
  return (
    <View style={Styles.container}>
      <View style={{backgroundColor: bgColor, flex: 1}} />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    height: 0.3,
    width: '100%',
    backgroundColor: Colors.gray,
    opacity: 0.8,
  },
  boldText: {
    fontWeight: 'bold',
  },
  contentContainerStyle: {
    paddingBottom: 200,
  },
  contentContainerStyle2: {
    paddingBottom: 100,
  },
});

export default ColorComponent;
