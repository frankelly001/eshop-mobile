import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import MultiStepSignUpWizard from '../components/MultiStepSignUpWizard';
import AuthForm from '../components/AuthForm';
import AppTextarea from '../components/AppTextarea';
import validationSchema from '../components/form/validationSchema';
import {signup} from '../api/setup/register';
import {useApi} from '../hooks/useApi';
import routes from '../navigation/routes';
import {logoutUser} from '../api/setup/logout';

const signup1_VS = Yup.object().shape({
  firstname: validationSchema.firstname,
  lastname: validationSchema.lastname,
  username: validationSchema.username,
});

const signup2_VS = Yup.object().shape({
  phone: validationSchema.phone,
  additional_phone: validationSchema.additional_phone,
  state: validationSchema.state,
  city: validationSchema.city,
  address: validationSchema.address,
  // zipcode: validationSchema.zipcode,
});

const signup3_VS = Yup.object().shape({
  email: validationSchema.email,
  password: validationSchema.password,
  confirm_password: validationSchema.confirm_password,
});

const SignupScreen = ({navigation}) => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  // console.log(user);

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleValidation = step => {
    if (step === 1) return signup1_VS;
    else if (step === 2) return signup2_VS;
    else return signup3_VS;
  };

  // const {data, error, loading, request} = useApi(signup);

  // console.log('data:', data, 'Error:', `${error}`);

  // const [user, setUser] = useState();
  // const onAuthStateChanged = user => {
  //   setUser(user);
  //   // console.log(user);
  // };

  // useEffect(()=> {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber;
  // }, [])

  const [error, setError] = useState();

  const handleSubmit = userInfo => {
    if (step !== 3) return nextStep();
    signup(userInfo)
      .then(() => {
        logoutUser()
          .then(() => {
            console.log('logOut succussful');
            navigation.replace(routes.LOGIN);
          })
          .catch(error => {
            alert(error);
          });
      })
      .catch(error => {
        setError(error.message);
      });
    // request(userInfo);
  };

  // const handleSubmit = userInfo => {
  //   if (step !== 3) return nextStep();
  //   request(userInfo);
  //   if (data) navigation.navigate(routes.LOGIN);

  //   // // console.log(validatedValues, 'Success');
  //   // signup(userInfo)
  //   //   .then(user => {
  //   //     setUser(user);
  //   //   })
  //   //   .catch(error => {
  //   //     // alert(`error`);
  //   //     setError(`${error}`.replace('Error: [auth/email-already-in-use]', ''));
  //   //   });
  // };

  return (
    <AuthForm
      welcomeMessage="Welcome to eShop"
      authTypeLabel="Sign Up"
      initialValues={{
        firstname: 'frank',
        lastname: 'okeke',
        username: 'frankelly',
        state: 'imo',
        city: 'owerri',
        address: 'alandinma',
        phone: '08176507344',
        addtional_phone: '',
        email: 'frankelly344@gmail.com',
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
