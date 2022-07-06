import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from './AppText';
import AppForm from './form/AppForm';
import AppFormInput from './form/AppFormInput';
import * as Yup from 'yup';
import AppGradientBtn from './AppGradientBtn';
import {fontSz} from '../config/responsiveSize';
import SubmitButton from './form/SubmitButton';
import Screen from './Screen';
import validationSchema from './form/validationSchema';
import fonts from '../config/fonts';
import AppFormTextArea from './form/AppFormTextArea';

const checkoutInfo_VS = Yup.object().shape({
  firstname: validationSchema.firstname,
  lastname: validationSchema.lastname,
  email: validationSchema.email,
  phone: validationSchema.phone,
  additional_phone: validationSchema.additional_phone,
  state: validationSchema.state,
  city: validationSchema.city,
  address: validationSchema.address,
});

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  additionalPhone: '',
  state: '',
  city: '',
  address: '',
};

const CheckoutInfo = ({savedValues, onSubmit}) => {
  // const [savedValues, setSavedValues] = useState(null);
  // console.log(savedValues);

  return (
    <Screen>
      <View style={styles.container}>
        <AppText style={styles.header}>Customer Delivery Information</AppText>
        <AppForm
          initialValues={savedValues || initialValues}
          validationSchema={checkoutInfo_VS}
          enableReinitialize
          validateOnMount={true}
          onSubmit={onSubmit}>
          <View style={[styles.formContainer]}>
            <AppFormInput
              autoCapitalize="words"
              autoCorrect={false}
              name="firstname"
              width="49.5%"
              placeholder="Firstname"
              textContentType="name"
            />
            <AppFormInput
              autoCapitalize="words"
              autoCorrect={false}
              name="lastname"
              width="49.5%"
              placeholder="Lastname"
              textContentType="name"
            />
            <AppFormInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              textContentType="emailAddress"
            />
            <AppFormInput
              keyboardType="numeric"
              name="phone"
              placeholder="Phone"
            />
            <AppFormInput
              keyboardType="numeric"
              name="additional_phone"
              placeholder="Additional phone (Optional)"
            />
            <AppFormInput
              autoCapitalize="words"
              autoCorrect={false}
              name="state"
              placeholder="State"
              textContentType="name"
            />
            <AppFormInput
              autoCapitalize="words"
              autoCorrect={false}
              name="city"
              placeholder="City"
              textContentType="name"
            />
            <AppFormTextArea
              autoCapitalize="words"
              autoCorrect={false}
              name="address"
              placeholder="Address"
              textContentType="fullStreetAddress"
            />
          </View>
          <SubmitButton
            label="Proceed payment"
            containerStyle={styles.btnContainerStyle}
            // onSaveValues={setSavedValues}
          />
        </AppForm>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    overflow: 'hidden',
  },
  header: {
    fontSize: fontSz(18),
    fontFamily: fonts.bold,
    marginBottom: 15,
  },
  formContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // backgroundColor: 'yellow',
  },
  btnContainerStyle: {
    width: '70%',
    marginVertical: 10,
    // alignSelf: 'center',
  },
});

export default CheckoutInfo;
