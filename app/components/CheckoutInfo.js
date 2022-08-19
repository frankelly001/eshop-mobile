import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from './AppText';
import AppForm from './form/AppForm';
import AppFormInput from './form/AppFormInput';
import * as Yup from 'yup';
import {fontSz} from '../config/responsiveSize';
import SubmitButton from './form/SubmitButton';
import Screen from './Screen';
import validationSchema from './form/validationSchema';
import fonts from '../config/fonts';
import AppFormTextArea from './form/AppFormTextArea';
import stateRegion from '../utilities/stateRegion';
import AppFormSelectInput from './form/AppFormSelectInput';
import AuthContext from '../auth/AuthContext';
import DeliveryInfoNotice from './Notice/DeliveryInfoNotice';
import colors from '../config/colors';

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

const orderingFor = ['Myself', 'A Friend', 'A Relative', 'Someone else'];

const CheckoutInfo = ({savedValues, onSubmit}) => {
  const {user} = useContext(AuthContext);

  const initialValues = {
    firstname: user?.name.firstname ?? '',
    lastname: user?.name.lastname ?? '',
    email: user?.email ?? '',
    phone: user?.phone.phone ?? '',
    additional_phone: user?.phone.additional_phone ?? '',
    state: user?.location.state ?? '',
    city: user?.location.city ?? '',
    address: user?.location.address ?? '',
  };

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

  // const handleOrderingFor = () => {
  //   return orderingFor.map(el => {
  //     return {label: el, value: el};
  //   });
  // };

  return (
    <Screen contentContainerStyle={{paddingBottom: 50}}>
      <View style={styles.container}>
        <AppText style={styles.header}>Customer Delivery Information</AppText>
        <AppText style={styles.subHeader}>
          Kindly update the current information provided, if you have relocated
          or you are ordering for Someone
        </AppText>
        <AppForm
          initialValues={savedValues ? savedValues : initialValues}
          validationSchema={checkoutInfo_VS}
          enableReinitialize
          validateOnMount={true}
          onSubmit={onSubmit}>
          <View style={[styles.formContainer]}>
            {/* <AppFormSelectInput
              name={'ordering_for'}
              onHandleData={handleOrderingFor}
              placeholder="Ordering for?"
              valueResetNames={['city']}
              searchPlaceholder="Search State..."
              disableSearchInput
            /> */}
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
              textContentType={'telephoneNumber'}
            />
            <AppFormInput
              keyboardType="numeric"
              name="additional_phone"
              placeholder="Additional phone (Optional)"
              textContentType={'telephoneNumber'}
            />
            <AppFormSelectInput
              name={'state'}
              onHandleData={handleState_Data}
              placeholder="Select State"
              valueResetNames={['city']}
              searchPlaceholder="Search State..."
            />
            <AppFormSelectInput
              name={'city'}
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
          </View>
          <SubmitButton
            label="Proceed payment"
            containerStyle={styles.btnContainerStyle}
            // onSaveValues={setSavedValues}
          />
        </AppForm>
        <DeliveryInfoNotice />
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
    fontSize: fontSz(15),
    fontFamily: fonts.bold,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: fontSz(10),
    color: colors.grey_dark_4,
    fontFamily: fonts.bold,
    marginBottom: 5,
    textAlign: 'center',
  },
  formContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  btnContainerStyle: {
    width: '70%',
    marginVertical: 10,
    // alignSelf: 'center',
  },
});

export default CheckoutInfo;
