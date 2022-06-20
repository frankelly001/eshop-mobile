import React from 'react';
import AppGradientBtn from './AppGradientBtn';
import {StyleSheet, View} from 'react-native';
import AppFormInput from './form/AppFormInput';
import {fontSz} from '../config/responsiveSize';
import SubmitButton from './form/SubmitButton';

const SignupScreen1 = () => {
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
      <SubmitButton label="Next" containerStyle={styles.btnContainerStyle} />
    </View>
  );
};

const SignupScreen2 = ({onPrev}) => {
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
        keyboardType="numeric"
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
        keyboardType="numeric"
        name="zipcode"
        placeholder="Zipcode"
      />
      <AppGradientBtn
        label="Back"
        onPress={() => onPrev()}
        containerStyle={styles.btnContainerStyle}
      />
      <SubmitButton label="Next" containerStyle={styles.btnContainerStyle} />
    </View>
  );
};

const SignupScreen3 = ({onPrev, setValidatedValues}) => {
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
      <AppFormInput keyboardType="numeric" name="phone" placeholder="Phone" />
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
        label="Back"
        onPress={() => onPrev()}
        containerStyle={styles.btnContainerStyle}
      />
      <SubmitButton
        label="Done"
        containerStyle={styles.btnContainerStyle}
        onSaveValues={setValidatedValues}
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
});

export {SignupScreen1, SignupScreen2, SignupScreen3};
