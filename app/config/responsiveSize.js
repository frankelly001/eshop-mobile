import {PixelRatio, Dimensions} from 'react-native';
const {width: SCREEN_WIDTH} = Dimensions.get('window');

const pixelRatio = PixelRatio.get();
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

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

export const fontSz = size => {
  if (pixelRatio >= 2 && pixelRatio < 3) {
    // iphone 5s and older Androids
    if (deviceWidth < 360) {
      return size * 0.95;
    }
    // iphone 5
    if (deviceHeight < 667) {
      return size;
      // iphone 6-6s
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.15;
    }
    // older phablets
    return size * 1.25;
  }
  if (pixelRatio >= 3 && pixelRatio < 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size;
    }
    // Catch other weird android width sizings
    if (deviceHeight < 667) {
      return size * 1.15;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.2;
    }
    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note 等等
    return size * 1.27;
  }
  if (pixelRatio >= 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size;
      // Catch other smaller android height sizings
    }
    if (deviceHeight < 667) {
      return size * 1.2;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.25;
    }
    // catch larger phablet devices
    return size * 1.4;
  }
  return size;
};

export const fontsizes = {
  xsmini: {
    fontSize: fontSz(10),
  },
  xmini: {
    fontSize: fontSz(12),
  },
  mini: {
    fontSize: fontSz(13),
  },
  small: {
    fontSize: fontSz(14),
  },
  medium: {
    fontSize: fontSz(16),
  },
  xmedium: {
    fontSize: fontSz(17),
  },
  large: {
    fontSize: fontSz(18),
  },
  xlarge: {
    fontSize: fontSz(20),
  },
};

// import {Dimensions, Platform, PixelRatio} from 'react-native';
// import {RFPercentage} from 'react-native-responsive-fontsize';
// const {width: SCREEN_WIDTH} = Dimensions.get('window');

// // based on iphone 5s's scale
// const scale = SCREEN_WIDTH / 320;

// export function normalize(size) {
//   const newSize = size * scale;
//   if (Platform.OS === 'ios') {
//     return Math.round(PixelRatio.roundToNearestPixel(newSize));
//   } else {
//     return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
//   }
// }

// import {
//   widthPercentageToDP,
//   heightPercentageToDP,
// } from 'react-native-responsive-screen';

// export const hp = val => {
//   // get scaled height equivalent of design height
//   const num = val / 8.44;
//   return heightPercentageToDP(num);
// };

// export const wp = val => {
//   // get scaled height equivalent of design width
//   const num = val / 3.88;
//   return widthPercentageToDP(num);
// };

// // export const fontSz = val => {
// //   // get scaled height equivalent of design width
// //   const num = val / 3.88;
// //   return widthPercentageToDP(num);
// // };

// // export const fontSz = val => RFPercentage(val / 7.6);
// export const fontSz = val => RFPercentage(val / 9.0);

// export const fontsizes = {
//   xsmini: {
//     fontSize: fontSz(12),
//   },
//   xmini: {
//     fontSize: fontSz(14),
//   },
//   mini: {
//     fontSize: fontSz(15),
//   },
//   small: {
//     fontSize: fontSz(17),
//   },
//   medium: {
//     fontSize: fontSz(18),
//   },
//   xmedium: {
//     fontSize: fontSz(21),
//   },
//   large: {
//     fontSize: fontSz(23),
//   },
//   xlarge: {
//     fontSize: fontSz(27),
//   },
// };
// // export const fontsizes = {
// //   xmini: {
// //     fontSize: fontSz(11),
// //   },
// //   mini: {
// //     fontSize: fontSz(12),
// //   },
// //   small: {
// //     fontSize: fontSz(14),
// //   },
// //   medium: {
// //     fontSize: fontSz(15),
// //   },
// //   xmedium: {
// //     fontSize: fontSz(18),
// //   },
// //   large: {
// //     fontSize: fontSz(20),
// //   },
// //   xlarge: {
// //     fontSize: fontSz(24),
// //   },
// // };
