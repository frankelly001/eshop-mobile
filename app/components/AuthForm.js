import React, {useContext, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import colors from '../config/colors';
import {fontSz, wp} from '../config/responsiveSize';
import routes from '../navigation/routes';
import AppText from './AppText';
import AppForm from './form/AppForm';
import fonts from '../config/fonts';
import ErrorMessage from './form/ErrorMessage';
import AppGradientText from './AppGradientText';
import {FacebookIcon, GoogleIcon, TwitterIcon} from '../utilities/icons';
import {
  LoginInwithGoogle,
  SignOutwithGoogle,
} from '../api/setup/authApi/socialAuth/googleAuth';
import {showToast} from './AppToast/showToast';
import toast from './AppToast/toast';
import {facebookSignin} from '../api/setup/authApi/socialAuth/facebookAuth';
import {getUser} from '../api/setup/getApi/getUser';
import AuthContext from '../auth/AuthContext';
import {authStorageKeys, storeUserData} from '../api/storage/authStorage';
import ActivityIndicator from './ActivityIndicator';
import SocialAuthentication from './SocialAuthentication';

const AuthForm = ({
  children,
  welcomeMessage,
  authTypeLabel,
  initialValues,
  validationSchema,
  onSubmit,
  navigation,
  error,
}) => {
  const navigateLinkLabel =
    authTypeLabel === 'Login'
      ? "Don't have an Account?"
      : 'Already have an Account?';
  const oppositeAuthTypeLabel = authTypeLabel === 'Login' ? 'Sign up' : 'Login';
  const routeName = authTypeLabel === 'Login' ? routes.SIGNUP : routes.LOGIN;

  return (
    <View style={styles.container}>
      <AppText style={styles.welcome}>{welcomeMessage}</AppText>
      <AppText style={styles.authLabel}>{authTypeLabel}</AppText>
      {/* <ErrorMessage error={error} visible={error} /> */}
      <AppForm
        enableReinitialize
        validateOnMount
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {children}
      </AppForm>
      <AppText style={styles.linkLabel}>{navigateLinkLabel}</AppText>
      <TouchableOpacity
        style={{paddingHorizontal: 10}}
        onPress={() => navigation.replace(routeName)}>
        <AppText style={styles.link}>{oppositeAuthTypeLabel}</AppText>
      </TouchableOpacity>
      <SocialAuthentication authLabel={authTypeLabel.toLowerCase()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'yellow',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    fontSize: fontSz(10),
    // fontWeight: '600',
    marginBottom: 25,
  },
  authLabel: {
    fontSize: fontSz(15),
    fontFamily: fonts.bold,
    marginBottom: 10,
  },
  linkLabel: {
    marginTop: 10,
    textAlign: 'center',
  },
  link: {
    fontFamily: fonts.bold,
    marginTop: 5,
    color: colors.purple,
  },
  socialContainer: {
    width: '100%',
    justifyContent: 'center',
    // backgroundColor: 'yellow',
    marginTop: 30,
  },
  handlesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthForm;
