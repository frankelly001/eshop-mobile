import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../components/AppText';
import AppForm from '../components/form/AppForm';
import AppFormSelectInput from '../components/form/AppFormSelectInput';
import SubmitButton from '../components/form/SubmitButton';
import Screen from '../components/Screen';
import colors from '../config/colors';
import fonts from '../config/fonts';
import * as Yup from 'yup';
import validationSchema from '../components/form/validationSchema';
import AppFormInput from '../components/form/AppFormInput';
import AuthContext from '../auth/AuthContext';
import {fontSz} from '../config/responsiveSize';
import {
  updateUserData,
  userDataTypes,
} from '../api/setup/patchApi/updateUserData';
import {useApi} from '../hooks/useApi';
import {showToast} from '../components/AppToast/showToast';
import toast from '../components/AppToast/toast';
import ActivityIndicator from '../components/ActivityIndicator';
import routes from '../navigation/routes';

const validation = Yup.object().shape({
  firstname: validationSchema.firstname,
  lastname: validationSchema.lastname,
  gender: validationSchema.gender,
  email: validationSchema.email,
  phone: validationSchema.phone,
  additional_phone: validationSchema.additional_phone,
});

const UserDetailsScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const initialValues = {
    firstname: user?.name.firstname,
    lastname: user?.name.lastname,
    gender: user?.gender,
    email: user?.email,
    phone: user?.phone.phone,
    additional_phone: user?.phone.additional_phone,
  };

  const {loading, request} = useApi(updateUserData);

  const handleSubmit = (userNewInFo, {resetForm}) => {
    const {firstname, lastname, gender, phone, additional_phone} = userNewInFo;
    request(user.id, {
      [userDataTypes.FIRSTNAME]: firstname,
      [userDataTypes.LASTNAME]: lastname,
      [userDataTypes.GENDER]: gender,
      [userDataTypes.PHONE]: phone,
      [userDataTypes.ADDITIONAL_PHONE]: additional_phone,
    })
      .then(() => {
        resetForm();
        showToast(toast.types.SUCCESS, 'User information successfully updated');
        navigation.navigate(routes.ACCOUNT);
      })
      .catch(error => {
        showToast(toast.types.ERROR, error.message);
      });
  };

  return (
    <>
      <ActivityIndicator visible={loading} portal />
      <Screen>
        <View style={styles.headerContainer}>
          <AppText style={styles.mainHeader}>Personal Information</AppText>
        </View>
        <View style={styles.container}>
          <AppText style={styles.header}>Edit Profile</AppText>
          <AppText style={styles.subHeader}>
            You can change the Information about your profile below.
          </AppText>
          <AppForm
            initialValues={initialValues}
            validationSchema={validation}
            enableReinitialize
            validateOnMount={true}
            onSubmit={handleSubmit}>
            <View style={[styles.formContainer]}>
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
              <AppFormSelectInput
                name={'gender'}
                // data={stateList}
                onHandleData={() => {
                  return ['Male', 'Female'].map(key => {
                    return {label: key, value: key};
                  });
                }}
                placeholder="Gender"
                disableSearchInput
              />
              <AppFormInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                editable={false}
                name="email"
                placeholder="Email"
                textContentType="emailAddress"
              />
              <AppFormInput
                keyboardType="numeric"
                name="phone"
                placeholder="Phone"
              />
              <AppFormInput
                keyboardType="numeric"
                name="additional_phone"
                placeholder="Additional phone (Optional)"
              />
            </View>
            <SubmitButton
              label="Save"
              containerStyle={{width: '60%', alignSelf: 'center'}}
              // onSaveValues={setSavedValues}
            />
          </AppForm>
        </View>
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  formContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: colors.grey_light_4,
  },
  mainHeader: {
    color: colors.grey_dark_4,
    fontFamily: fonts.bold,
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

export default UserDetailsScreen;
