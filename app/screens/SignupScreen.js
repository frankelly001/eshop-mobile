import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import MultiStepSignUpWizard from '../components/MultiStepSignUpWizard';
import AuthForm from '../components/AuthForm';
import validationSchema from '../components/form/validationSchema';
import {signup} from '../api/setup/authApi/register';
import {useApi} from '../hooks/useApi';
import routes from '../navigation/routes';
import {logoutUser} from '../api/setup/authApi/logout';
import ActivityIndicator from '../components/ActivityIndicator';
import {showToast} from '../components/AppToast/showToast';
import toast from '../components/AppToast/toast';

const handleValidation = step => {
  let schema;
  if (step === 1)
    schema = {
      firstname: validationSchema.firstname,
      lastname: validationSchema.lastname,
      gender: validationSchema.gender,
    };
  else if (step === 2)
    schema = {
      phone: validationSchema.phone,
      additional_phone: validationSchema.additional_phone,
      state: validationSchema.state,
      city: validationSchema.city,
      address: validationSchema.address,
    };
  else
    schema = {
      email: validationSchema.email,
      password: validationSchema.password,
      confirm_password: validationSchema.confirm_password,
    };

  return Yup.object().shape(schema);
};

const handleTouched = step => {
  let touched;
  if (step === 1) {
    touched = {
      firstname: true,
      lastname: true,
      gender: true,
    };
  } else if (step === 2) {
    touched = {
      phone: true,
      additional_phone: true,
      state: true,
      city: true,
      address: true,
    };
  } else {
    touched = {
      email: true,
      password: true,
      confirm_password: true,
    };
  }
  return touched;
};

const SignupScreen = ({navigation}) => {
  const [step, setStep] = useState(1);
  const {error, loading, request} = useApi(signup);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (userInfo, {resetForm, setTouched}) => {
    setTouched(handleTouched(step));
    if (step !== 3) return nextStep();

    request(userInfo)
      .then(() => {
        logoutUser()
          .then(() => {
            resetForm();
            showToast(toast.types.SUCCESS, 'Account Successfully Created');
            navigation.replace(routes.LOGIN);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <ActivityIndicator visible={loading} portal />
      <AuthForm
        welcomeMessage="Welcome to eShop"
        authTypeLabel="Sign Up"
        initialValues={{
          // firstname: '',
          // lastname: '',
          // gender: '',
          // state: '',
          // city: '',
          // address: '',
          // phone: '',
          // additional_phone: '',
          // email: '',
          // password: '',
          // confirm_password: '',
          firstname: 'Franklyn',
          lastname: 'Okeke',
          gender: 'Male',
          state: 'Imo',
          city: 'Orsu',
          address: '56 sowemimo Street',
          phone: '08176507344',
          additional_phone: '',
          email: 'Frankelly3344@gmail.com',
          password: '123456',
          confirm_password: '123456',
        }}
        error={error}
        validationSchema={handleValidation(step)}
        onSubmit={handleSubmit}
        navigation={navigation}>
        <MultiStepSignUpWizard
          step={step}
          prevStep={prevStep}
          // setValidatedValues={setValidatedValues}
        />
      </AuthForm>
    </>
  );

  // initialValues={{
  //   firstname: '',
  //   lastname: '',
  //   username: '',
  //   city: '',
  //   number: '',
  //   street: '',
  //   zipcode: '',
  //   email: '',
  //   phone: '',
  //   password: '',
  //   confirmPassword: '',
  //   // lat: '10111',
  //   // long: '100101',
  // }}
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
