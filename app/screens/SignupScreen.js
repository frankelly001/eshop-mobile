import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import AppForm from '../components/form/AppForm';
import AppFormInput from '../components/form/AppFormInput';
import * as Yup from 'yup';
import MultiStepSignUpWizard from '../components/MultiStepSignUpWizard';
import AuthForm from '../components/AuthForm';
import AppTextarea from '../components/AppTextarea';

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required().min(1).label('Firstname'),
  lastname: Yup.string().required().min(1).label('Lastname'),
  username: Yup.string().required().min(1).label('Username'),
  city: Yup.string().required().min(1).label('City'),
  number: Yup.number().required().min(1).label('Street no'),
  street: Yup.string().required().min(1).label('Street Address'),
  zipcode: Yup.number().required().min(1).label('Zipcode'),
  email: Yup.string().required().email().label('Email'),
  phone: Yup.string()
    .required()
    .min(11)
    .max(11)
    .label('Phone')
    .matches(/^[0-9]+$/, 'Phone must be only digits'),
  password: Yup.string().required().min(4).label('Password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Confirm Password must match Password')
    .required()
    .label('Confirm password'),

  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref('password'), null], 'Confirm Password must match Password')
  //   .required('Confirm password is required')
  // category: Yup.object().required().nullable().label('Category'),
  // images: Yup.array().min(1, 'Please select at least one image'),
  // description: Yup.string().label('Description'),
});

const SignupScreen = props => {
  return (
    <AuthForm
      welcomeMessage="Welcome to eShop"
      authTypeLabel="Sign Up"
      initialValues={{
        firstname: '',
        lastname: '',
        username: '',
        city: '',
        number: '',
        street: '',
        zipcode: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        // lat: '10111',
        // long: '100101',
      }}
      validationSchema={validationSchema}>
      <MultiStepSignUpWizard />
    </AuthForm>
  );

  // return (
  //   <View style={styles.container}>
  //     <AppForm
  //       initialValues={{
  //         firstname: '',
  //         lastname: '',
  //         username: '',
  //         city: '',
  //         number: '',
  //         street: '',
  //         zipcode: '',
  //         email: '',
  //         phone: '',
  //         password: '',
  //         confirmPassword: '',
  //         // lat: '10111',
  //         // long: '100101',
  //       }}
  //       validationSchema={validationSchema}>
  //       <MultiStepSignUpWizard />
  //     </AppForm>
  //   </View>
  // );
};

export default SignupScreen;
