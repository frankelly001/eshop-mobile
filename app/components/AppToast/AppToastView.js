import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors from '../../config/colors';
import fonts from '../../config/fonts';
import {fontSz} from '../../config/responsiveSize';
import AppText from '../AppText';
import AnimatedLottieView from 'lottie-react-native';
import toast from './toast';

const AppToastView = ({message, type}) => {
  console.log(type, 'check');

  return (
    <View style={styles.container}>
      {/* {displayIconBasedOnType()} */}
      <View style={[styles.toast, {backgroundColor: toast.toastColors[type]}]}>
        <AnimatedLottieView
          style={[
            styles.lottieIcon,
            type !== toast.types.INFO && styles.iconFit,
          ]}
          autoPlay
          loop
          source={toast.IconSources[type]}
        />

        <View style={{flex: 1, paddingRight: 15}}>
          <AppText numberOfLines={2} style={styles.msgText}>
            {message}
          </AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    // margin: 10,
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
  },
  toast: {
    height: '100%',
    backgroundColor: colors.white,
    borderRadius: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgText: {
    color: colors.white,
    fontFamily: fonts.semi_bold,
    fontSize: fontSz(13),
    // backgroundColor: 'red',
  },
  lottieIcon: {
    height: 50,
    width: 50,
  },
  iconFit: {
    marginLeft: -10,
    marginTop: -7,
    marginRight: 10,
  },
});

export default AppToastView;
