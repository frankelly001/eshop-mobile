import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const GradientBackground = ({children, style}) => {
  return (
    <LinearGradient
      colors={['#5d05b5', '#9E1E7C', '#dc3545']}
      style={style}
      // start={{x: 0.494, y: 0}}
      // end={{x: 0.5, y: 0.95}}

      // locations={[0.1, 0.7, 1]}
      // useAngle={true}
      // angle={179.63}
      // angleCenter={{x: 0.5, y: 0.3}}
      locations={[0.1, 0.7, 1]}
      useAngle={true}
      angle={179.85}
      angleCenter={{x: 0.5, y: 0.4}}>
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;
