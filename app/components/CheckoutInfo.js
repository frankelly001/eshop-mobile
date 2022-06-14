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

const checkoutInfo_VS = Yup.object().shape({
  firstname: validationSchema.firstname,
  lastname: validationSchema.lastname,
  email: validationSchema.email,
  phone: validationSchema.phone,
  additionalPhone: validationSchema.additionalPhone,
  city: validationSchema.city,
  number: validationSchema.number,
  street: validationSchema.street,
  zipcode: validationSchema.zipcode,
});

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  additionalPhone: '',
  city: '',
  number: '',
  street: '',
  zipcode: '',
};

const CheckoutInfo = ({savedValues, setSavedValues, onSubmit}) => {
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
              autoCapitalize="none"
              autoCorrect={false}
              name="firstname"
              width="49.5%"
              placeholder="Firstname"
              textContentType="name"
            />
            <AppFormInput
              autoCapitalize="none"
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
              name="additionalPhone"
              placeholder="Additional phone (Optional)"
            />
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
          </View>
          <SubmitButton
            labelStyle={styles.btnLabel}
            label="Proceed payment"
            containerStyle={styles.btnContainerStyle}
            onSaveValues={setSavedValues}
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
    fontWeight: '700',
    marginBottom: 15,
  },
  formContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // backgroundColor: 'yellow',
  },
  btnLabel: {
    fontSize: fontSz(15),
    fontWeight: '700',
  },
  btnContainerStyle: {
    width: '49.5%',
    marginVertical: 10,
    // alignSelf: 'center',
  },
});

export default CheckoutInfo;
