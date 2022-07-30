import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import AuthContext from '../auth/AuthContext';
import {hp} from '../config/responsiveSize';
import AppButton from './AppButton';
import AppGradientBtn from './AppGradientBtn';

const RetryView = props => {
  const {retryFetch} = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <AppGradientBtn
        label="Try Again"
        containerStyle={styles.btnContainer}
        onPress={retryFetch}
      />
      {/* <AppButton bgStyle={styles.btnContainer} label="Try Again" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    width: '50%',
    height: hp(36),
    marginVertical: 20,
  },
});

export default RetryView;
