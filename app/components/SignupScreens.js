import React from 'react';
import AppGradientBtn from './AppGradientBtn';
import {StyleSheet, View} from 'react-native';
import AppFormInput from './form/AppFormInput';
import {fontSz} from '../config/responsiveSize';
import SubmitButton from './form/SubmitButton';
import AppFormTextArea from './form/AppFormTextArea';
import AppFormSelectInput from './form/AppFormSelectInput';
import stateRegion from '../utilities/stateRegion';

// console.log(stateRegion['Lagos']);

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
  const handleState_Data = () => {
    const data = Object.keys(stateRegion).map((key, index) => {
      return {label: key, value: key};
    });

    return data;
  };

  const handleCity_Data = values => {
    const data = values['state']
      ? stateRegion[values['state']].map(key => {
          return {label: key, value: key};
        })
      : [{label: 'State not Selected'}];

    return data;
  };

  return (
    <View style={styles.container}>
      <AppFormInput keyboardType="numeric" name="phone" placeholder="Phone" />
      <AppFormInput
        keyboardType="numeric"
        name="additional_phone"
        placeholder="Additional Phone"
      />
      <AppFormSelectInput
        name={'state'}
        // data={stateList}
        onHandleData={handleState_Data}
        placeholder="Select State"
        valueResetNames={['city']}
        searchPlaceholder="Search State..."
      />
      <AppFormSelectInput
        name={'city'}
        // data={lga}
        onHandleData={handleCity_Data}
        placeholder="Select City"
        searchPlaceholder="Search City..."
      />
      <AppFormTextArea
        autoCapitalize="words"
        autoCorrect={false}
        name="address"
        placeholder="Address"
        textContentType="fullStreetAddress"
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
        name="confirm_password"
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
        // onSaveValues={setValidatedValues}
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
