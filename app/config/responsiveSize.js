import {Dimensions, Platform, PixelRatio} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
const {width: SCREEN_WIDTH} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export const hp = val => {
  // get scaled height equivalent of design height
  const num = val / 8.44;
  return heightPercentageToDP(num);
};

export const wp = val => {
  // get scaled height equivalent of design width
  const num = val / 3.88;
  return widthPercentageToDP(num);
};

// export const fontSz = val => {
//   // get scaled height equivalent of design width
//   const num = val / 3.88;
//   return widthPercentageToDP(num);
// };

// export const fontSz = val => RFPercentage(val / 7.6);
export const fontSz = val => RFPercentage(val / 9.0);

export const fontsizes = {
  xsmini: {
    fontSize: fontSz(12),
  },
  xmini: {
    fontSize: fontSz(14),
  },
  mini: {
    fontSize: fontSz(15),
  },
  small: {
    fontSize: fontSz(17),
  },
  medium: {
    fontSize: fontSz(18),
  },
  xmedium: {
    fontSize: fontSz(21),
  },
  large: {
    fontSize: fontSz(23),
  },
  xlarge: {
    fontSize: fontSz(27),
  },
};
// export const fontsizes = {
//   xmini: {
//     fontSize: fontSz(11),
//   },
//   mini: {
//     fontSize: fontSz(12),
//   },
//   small: {
//     fontSize: fontSz(14),
//   },
//   medium: {
//     fontSize: fontSz(15),
//   },
//   xmedium: {
//     fontSize: fontSz(18),
//   },
//   large: {
//     fontSize: fontSz(20),
//   },
//   xlarge: {
//     fontSize: fontSz(24),
//   },
// };
