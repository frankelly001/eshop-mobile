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
import validationSchema from '../components/form/validationSchema';

const signup1_VS = Yup.object().shape({
  firstname: validationSchema.firstname,
  lastname: validationSchema.lastname,
  username: validationSchema.username,
});

const signup2_VS = Yup.object().shape({
  city: validationSchema.city,
  number: validationSchema.number,
  street: validationSchema.street,
  zipcode: validationSchema.zipcode,
});

const signup3_VS = Yup.object().shape({
  email: validationSchema.email,
  phone: validationSchema.phone,
  password: validationSchema.password,
  confirmPassword: validationSchema.confirmPassword,
});

const SignupScreen = props => {
  const [step, setStep] = useState(1);
  const [validatedValues, setValidatedValues] = useState(null);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleValidation = step => {
    if (step === 1) return signup1_VS;
    else if (step === 2) return signup2_VS;
    else return signup3_VS;
  };

  const handleSubmit = () => {
    if (step !== 3) return nextStep();
    console.log(validatedValues, 'Success');
  };

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
      validationSchema={handleValidation(step)}
      onSubmit={handleSubmit}>
      <MultiStepSignUpWizard
        step={step}
        prevStep={prevStep}
        setValidatedValues={setValidatedValues}
      />
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
