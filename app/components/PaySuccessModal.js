import {useFocusEffect, useNavigation} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import React, {useCallback, useState} from 'react';
import {BackHandler, StyleSheet, View} from 'react-native';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontSz, wp} from '../config/responsiveSize';
// import navigation from '../navigation/rootNavigation';
import routes from '../navigation/routes';
import AppButton from './AppButton';
import AppText from './AppText';
import ModalOverlay from './ModalOverlay';

const PaySuccessModal = ({visible, deliveryStateLocation}) => {
  const [nextView, setNextView] = useState(false);
  const navigation = useNavigation();

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <ModalOverlay modalStyle={{backgroundColor: colors.white}} portal>
        {!nextView && (
          <>
            <AnimatedLottieView
              style={{width: wp(300), height: wp(300)}}
              onAnimationFinish={() => {
                setNextView(true);
              }}
              autoPlay
              loop={false}
              source={require('../assets/icons/animatedIcons/transacton_success.json')}
            />
            <AppText
              style={{fontFamily: fonts.semi_bold, fontSize: fontSz(12)}}>
              Transaction successful
            </AppText>
          </>
        )}
        {nextView && (
          <>
            <AnimatedLottieView
              style={{marginBottom: 50}}
              autoPlay
              loop
              source={require('../assets/icons/animatedIcons/delivery_bike.json')}
            />
            <View
              style={{
                position: 'absolute',
                bottom: 30,
                alignItems: 'center',
                paddingHorizontal: 20,
                // backgroundColor: 'red',
                width: '100%',
              }}>
              <AppText
                style={{
                  fontFamily: fonts.semi_bold,
                  fontSize: fontSz(12),
                  marginVertical: 10,
                  textAlign: 'center',
                }}>
                Your delivery is on it's way and will arrive within{' '}
                {deliveryStateLocation === 'Lagos' ? '24hrs' : '3days'}. Thank
                you for your order, we hope you enjoy your new purchase!
              </AppText>
              <AppButton
                label="See Orders"
                onPress={() => navigation.replace(routes.ORDERS, routes.HOME)}
                bgStyle={{width: '80%'}}
              />
            </View>
          </>
        )}
      </ModalOverlay>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PaySuccessModal;
