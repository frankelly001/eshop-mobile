import React, {useRef} from 'react';
import {SafeAreaView, ScrollView, children, useColorScheme} from 'react-native';
import AppButton from './AppButton';

const Screen = ({children, scrollView, contentContainerStyle, style}) => {
  return (
    <SafeAreaView>
      <ScrollView
        ref={scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentContainerStyle}
        style={style}
        contentInsetAdjustmentBehavior="automatic">
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Screen;
