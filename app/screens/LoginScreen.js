import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import AppText from '../components/AppText';
import AuthForm from '../components/AuthForm';
import * as Yup from 'yup';
import AppFormInput from '../components/form/AppFormInput';
import AppGradientBtn from '../components/AppGradientBtn';
import {fontSz} from '../config/responsiveSize';
import SubmitButton from '../components/form/SubmitButton';
import colors from '../config/colors';
import validationSchema from '../components/form/validationSchema';
import {loginWithEmailAndPassword} from '../api/setup/authApi/login';
import {useApi} from '../hooks/useApi';
import AuthContext from '../auth/AuthContext';
import ActivityIndicator from '../components/ActivityIndicator';
import {authStorageKeys, storeUserData} from '../api/storage/authStorage';
import {showToast} from '../components/AppToast/showToast';
import toast from '../components/AppToast/toast';
import routes from '../navigation/routes';
import {formatErrorMessage} from '../utilities/formatErrorMessage';

const login_VS = Yup.object().shape({
  email: validationSchema.email,
  password: validationSchema.defaultPassword('password'),
});

const LoginScreen = ({navigation}) => {
  const {setUser} = useContext(AuthContext);

  const {error, loading, request} = useApi(loginWithEmailAndPassword);

  const handleSubmit = (userInfo, {resetForm}) => {
    request(userInfo)
      .then(userData => {
        resetForm();
        setUser(userData);
        storeUserData(authStorageKeys.USER_DATA, userData);
        showToast(
          toast.types.SUCCESS,
          `Welcome ${userData.name.firstname}${
            !userData.verified ? ', Please Verify your Account' : ''
          }`,
        );
      })
      .catch(error => {
        showToast(toast.types.ERROR, formatErrorMessage(error));
      });
  };

  return (
    <>
      <ActivityIndicator visible={loading} portal />
      <AuthForm
        welcomeMessage="Welcome to Back!"
        authTypeLabel="Login"
        initialValues={{
          // email: '',
          // password: '',
          email: '',
          password: '',
        }}
        validationSchema={login_VS}
        navigation={navigation}
        // error={error}
        onSubmit={handleSubmit}>
        <View style={[styles.container, {justifyContent: 'center'}]}>
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
            textContentType={'password'}
          />
          <SubmitButton
            labelStyle={styles.btnLabel}
            label="Login"
            disable={loading}
            containerStyle={styles.btnContainerStyle}
          />
        </View>
        {/* <AppGradientBtn label="Sign in with Google" onPress={signInwithGoogle} />
      <AppGradientBtn label="Sign in with Facebook" onPress={facebookSignin} />
      <AppGradientBtn label="logout" onPress={logout} /> */}
        <TouchableOpacity
          style={{marginVertical: 10}}
          onPress={() => navigation.navigate(routes.FORGOTPASSWORD)}>
          <AppText style={styles.link}>Forgot Password?</AppText>
        </TouchableOpacity>
      </AuthForm>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // backgroundColor: 'yellow',
  },
  btnContainerStyle: {
    width: '49.5%',
  },

  link: {
    // fontFamily: fonts.bold,
    // marginTop: 5,
    color: colors.purple,
  },
});

export default LoginScreen;
