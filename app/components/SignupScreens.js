import React from 'react';
import AppGradientBtn from './AppGradientBtn';
import {StyleSheet, View} from 'react-native';
import AppFormInput from './form/AppFormInput';
import {fontSz} from '../config/responsiveSize';
import SubmitButton from './form/SubmitButton';

const SignupScreen1 = ({onNext}) => {
  return (
    <View style={[styles.container, {justifyContent: 'center'}]}>
      <AppFormInput
        autoCapitalize="none"
        autoCorrect={false}
        name="firstname"
        placeholder="Firstname"
        textContentType="name"
      />
      <AppFormInput
        autoCapitalize="none"
        autoCorrect={false}
        name="lastname"
        placeholder="Lastname"
        textContentType="name"
      />
      <AppFormInput
        autoCapitalize="none"
        autoCorrect={false}
        name="username"
        placeholder="Username"
        textContentType="name"
      />
      <AppGradientBtn
        labelStyle={styles.btnLabel}
        label="Next"
        onPress={() => onNext()}
        containerStyle={styles.btnContainerStyle}
      />
    </View>
  );
};

const SignupScreen2 = ({onPrev, onNext}) => {
  return (
    <View style={styles.container}>
      <AppFormInput
        autoCapitalize="none"
        autoCorrect={false}
        name="city"
        placeholder="City"
        textContentType="name"
      />
      <AppFormInput
        autoCapitalize="none"
        keyboardType="number"
        autoCorrect={false}
        name="number"
        width="35%"
        placeholder="Street No"
        textContentType="name"
      />
      <AppFormInput
        autoCapitalize="none"
        autoCorrect={false}
        name="street"
        width="64%"
        placeholder="Streer Address"
        textContentType="name"
      />
      <AppFormInput
        keyboardType="number"
        name="zipcode"
        placeholder="Zipcode"
      />
      <AppGradientBtn
        labelStyle={styles.btnLabel}
        label="Back"
        onPress={() => onPrev()}
        containerStyle={styles.btnContainerStyle}
      />
      <AppGradientBtn
        labelStyle={styles.btnLabel}
        label="Next"
        onPress={() => onNext()}
        containerStyle={styles.btnContainerStyle}
      />
    </View>
  );
};

const SignupScreen3 = ({onPrev}) => {
  return (
    <View style={styles.container}>
      <AppFormInput
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="email-address"
        name="email"
        placeholder="Email"
        textContentType="emailAddress"
      />
      <AppFormInput keyboardType="number" name="phone" placeholder="Phone" />
      <AppFormInput
        autoCapitalize="none"
        autoCorrect={false}
        name="password"
        placeholder="Password"
        textContentType="name"
      />
      <AppFormInput
        autoCapitalize="none"
        autoCorrect={false}
        name="confirmPassword"
        placeholder="Confirm Password"
        textContentType="name"
      />
      <AppGradientBtn
        labelStyle={styles.btnLabel}
        label="Back"
        onPress={() => onPrev()}
        containerStyle={styles.btnContainerStyle}
      />
      <SubmitButton
        labelStyle={styles.btnLabel}
        label="Done"
        containerStyle={styles.btnContainerStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  btnContainerStyle: {
    width: '49.5%',
    marginVertical: 10,
  },
  btnLabel: {
    fontSize: fontSz(15),
    fontWeight: '700',
  },
});

export {SignupScreen1, SignupScreen2, SignupScreen3};
