import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from './AppText';
import AppForm from './form/AppForm';
import AppFormInput from './form/AppFormInput';
import * as Yup from 'yup';
import AppGradientBtn from './AppGradientBtn';
import {fontSz} from '../config/responsiveSize';
import SubmitButton from './form/SubmitButton';
import Screen from './Screen';

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().min(1).label('Firstname'),
  lastname: Yup.string().required().min(1).label('Lastname'),
  email: Yup.string().required().email().label('Email'),
  phone1: Yup.string()
    .required()
    .min(11)
    .max(11)
    .label('Phone')
    .matches(/^[0-9]+$/, 'Phone must be only digits'),
  phone2: Yup.string()
    .min(11)
    .max(11)
    .label('Additional phone')
    .matches(/^[0-9]+$/, 'Additional phone must be only digits'),
  city: Yup.string().required().min(1).label('City'),
  number: Yup.number().required().min(1).label('Street no'),
  street: Yup.string().required().min(1).label('Street Address'),
  zipcode: Yup.number().required().min(1).label('Zipcode'),
});

const CheckoutInfo = ({onSubmit}) => {
  return (
    <Screen>
      <View style={styles.container}>
        <AppText style={styles.header}>Customer Delivery Information</AppText>
        <AppForm
          initialValues={{
            firstname: '',
            lastname: '',
            email: '',
            phone1: '',
            phone2: '',
            city: '',
            number: '',
            street: '',
            zipcode: '',
          }}
          validationSchema={validationSchema}
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
              name="phone1"
              placeholder="Phone"
            />
            <AppFormInput
              keyboardType="numeric"
              name="phone2"
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
          <AppGradientBtn
            labelStyle={styles.btnLabel}
            label="Proceed payment"
            onPress={onSubmit}
            containerStyle={styles.btnContainerStyle}
          />
          {/* <SubmitButton
          labelStyle={styles.btnLabel}
          label="Proceed payment"
          containerStyle={styles.btnContainerStyle}
        /> */}
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
