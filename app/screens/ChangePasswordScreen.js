import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {auth} from '../api/setup/config';
import AppForm from '../components/form/AppForm';
import AppFormInput from '../components/form/AppFormInput';
import validationSchema from '../components/form/validationSchema';
import * as Yup from 'yup';
import SubmitButton from '../components/form/SubmitButton';
import AuthContext from '../auth/AuthContext';
import {changePassword} from '../api/setup/authApi/changePassword';
import {useApi} from '../hooks/useApi';
import {showToast} from '../components/AppToast/showToast';
import Screen from '../components/Screen';
import ActivityIndicator from '../components/ActivityIndicator';
import toast from '../components/AppToast/toast';
import routes from '../navigation/routes';
import AppText from '../components/AppText';
import fonts from '../config/fonts';
import {fontSz} from '../config/responsiveSize';
import colors from '../config/colors';

const validation = Yup.object().shape({
  currentPassword: validationSchema.deafaultPassword.required(
    'Please your current password',
  ),
  newPassword: validationSchema.newPassword,
  confirm_newPassword: validationSchema.confirm_newPassword,
});

const ChangePasswordScreen = ({navigation}) => {
  const {loading, request} = useApi(changePassword);

  const handleSubmit = (passwordData, {resetForm}) => {
    const {currentPassword, newPassword} = passwordData;
    request(currentPassword, newPassword)
      .then(response => {
        resetForm();
        showToast(toast.types.SUCCESS, response);
        navigation.navigate(routes.ACCOUNT);
      })
      .catch(error => {
        showToast(toast.types.ERROR, error);
      });
    // console.log(passwordData, 'kkkkkkkkk');/
  };
  return (
    <Screen>
      <ActivityIndicator portal visible={loading} />
      <View style={styles.container}>
        <AppText style={styles.subHeader}>
          Make sure you remember your password
        </AppText>
        <AppForm
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirm_newPassword: '',
          }}
          validationSchema={validation}
          enableReinitialize
          validateOnMount={true}
          onSubmit={handleSubmit}>
          <View style={styles.formContainer}>
            <AppFormInput
              autoCapitalize="none"
              autoCorrect={false}
              name="currentPassword"
              placeholder="Current Password"
              textContentType="name"
            />
            <AppFormInput
              autoCapitalize="none"
              autoCorrect={false}
              name="newPassword"
              placeholder="New Password"
              textContentType="name"
            />
            <AppFormInput
              autoCapitalize="none"
              autoCorrect={false}
              name="confirm_newPassword"
              placeholder="Confirm New Password"
              textContentType="name"
            />
            <SubmitButton
              containerStyle={{width: '60%', alignSelf: 'center'}}
              label="Change Password"
            />
          </View>
        </AppForm>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    width: '100%',
  },
  subHeader: {
    fontSize: fontSz(10),
    color: colors.grey_dark_4,
    fontFamily: fonts.bold,
    marginBottom: 5,
  },
});

export default ChangePasswordScreen;
