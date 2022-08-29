import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppGradientBtn from '../components/AppGradientBtn';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import fonts from '../config/fonts';
import {fontSz} from '../config/responsiveSize';
import routes from '../navigation/routes';

const VouchersScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.text}>
        You currently have no Coupon Available.
      </AppText>
      <AppGradientBtn
        label="Continue Shopping"
        containerStyle={{width: '50%'}}
        onPress={() => navigation.navigate(routes.HOME)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    // fontFamily: fonts.semi_bold,
    // fontSize: fontSz(15),
    marginBottom: 10,
  },
  container: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default VouchersScreen;
