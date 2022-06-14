import React from 'react';
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

const login_VS = Yup.object().shape({
  username: validationSchema.username,
  password: validationSchema.password,
});

const LoginScreen = () => {
  return (
    <AuthForm
      welcomeMessage="Welcome to Back!"
      authTypeLabel="Login"
      initialValues={{
        username: '',
        password: '',
      }}
      validationSchema={login_VS}>
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <AppFormInput
          autoCapitalize="none"
          autoCorrect={false}
          name="username"
          placeholder="Username"
          textContentType="name"
        />
        <AppFormInput
          autoCapitalize="none"
          autoCorrect={false}
          name="password"
          placeholder="Password"
          textContentType="name"
        />
        <SubmitButton
          labelStyle={styles.btnLabel}
          label="Login"
          containerStyle={styles.btnContainerStyle}
        />
      </View>
      <TouchableOpacity style={{marginVertical: 10}}>
        <AppText style={styles.link}>Forgot Password?</AppText>
      </TouchableOpacity>
    </AuthForm>
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
    marginVertical: 10,
  },
  btnLabel: {
    fontSize: fontSz(15),
    fontWeight: '700',
  },
  link: {
    fontWeight: '700',
    // marginTop: 5,
    color: colors.purple,
  },
});

export default LoginScreen;
