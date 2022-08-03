import React from 'react';
import {StyleSheet, View} from 'react-native';
import ActivityIndicator from '../components/ActivityIndicator';
import AppForm from '../components/form/AppForm';
import AppFormInput from '../components/form/AppFormInput';
import SubmitButton from '../components/form/SubmitButton';
import Screen from '../components/Screen';
import * as Yup from 'yup';
import validationSchema from '../components/form/validationSchema';
import {forgotPassword} from '../api/setup/authApi/forgotPassword';
import {useApi} from '../hooks/useApi';
import toast from '../components/AppToast/toast';
import {showToast} from '../components/AppToast/showToast';
import routes from '../navigation/routes';
import AppText from '../components/AppText';
import {fontSz} from '../config/responsiveSize';
import fonts from '../config/fonts';
import colors from '../config/colors';

const validation = Yup.object().shape({
  email: validationSchema.email,
});

const ForgottenPasswordScreen = ({navigation}) => {
  const {error, loading, request} = useApi(forgotPassword);

  const handleSubmit = (data, {resetForm}) => {
    request(data.email)
      .then(response => {
        resetForm();
        showToast(toast.types.SUCCESS, response);
        navigation.navigate(routes.LOGIN);
      })
      .catch(error => showToast(toast.types.ERROR, error));
    // console.log(data.email);
  };

  console.log(error, 'kkkkk');

  return (
    <Screen>
      <ActivityIndicator portal visible={loading} />
      <View style={styles.container}>
        <AppText style={styles.header}>Reset Password</AppText>
        <AppText style={styles.subHeader}>
          Enter your email address below to reset password
        </AppText>
        <AppForm
          initialValues={{
            email: '',
          }}
          validationSchema={validation}
          enableReinitialize
          validateOnMount={true}
          onSubmit={handleSubmit}>
          <View style={styles.formContainer}>
            <AppFormInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              name="email"
              placeholder="Email"
              textContentType="emailAddress"
            />
            <SubmitButton
              containerStyle={{width: '60%', alignSelf: 'center'}}
              label="Reset Password"
            />
          </View>
        </AppForm>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
  },
  header: {
    fontSize: fontSz(18),
    fontFamily: fonts.bold,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: fontSz(12),
    color: colors.grey_dark_4,
    fontFamily: fonts.bold,
  },
});

export default ForgottenPasswordScreen;
