import {useNavigation} from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontSz, wp} from '../config/responsiveSize';
// import navigation from '../navigation/rootNavigation';
import routes from '../navigation/routes';
import AppButton from './AppButton';
import AppText from './AppText';
import ModalOverlay from './ModalOverlay';

const PaySuccessModal = ({visible}) => {
  const [nextView, setNextView] = useState(false);
  if (!visible) return null;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ModalOverlay modalStyle={{backgroundColor: colors.white}} portal>
        {visible && nextView && (
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
              style={{fontFamily: fonts.semi_bold, fontSize: fontSz(13)}}>
              Transaction successful
            </AppText>
          </>
        )}
        {!nextView && visible && (
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
              }}>
              <AppText
                style={{
                  fontFamily: fonts.semi_bold,
                  fontSize: fontSz(13),
                  marginVertical: 10,
                }}>
                Your delivery is on the way
              </AppText>
              <AppButton
                label="See Orders"
                onPress={() => navigation.replace(routes.ORDERS)}
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
