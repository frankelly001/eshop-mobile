import React, {useContext, useState} from 'react';
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
import AuthContext from '../auth/AuthContext';
import stateRegion from '../utilities/stateRegion';
import AppFormTextArea from '../components/form/AppFormTextArea';
import {fontSz} from '../config/responsiveSize';
import {
  updateUserData,
  userDataTypes,
} from '../api/setup/patchApi/updateUserData';
import {useApi} from '../hooks/useApi';
import ActivityIndicator from '../components/ActivityIndicator';
import {showToast} from '../components/AppToast/showToast';
import toast from '../components/AppToast/toast';
import routes from '../navigation/routes';
import {formatErrorMessage} from '../utilities/formatErrorMessage';

const validation = Yup.object().shape({
  state: validationSchema.state,
  city: validationSchema.city,
  address: validationSchema.address,
});
const AddressBookScreen = ({navigation}) => {
  const {user, setUser} = useContext(AuthContext);
  const initialValues = {
    state: user.location.state,
    city: user.location.city,
    address: user.location.address,
  };

  const handleState_Data = () => {
    const data = Object.keys(stateRegion).map((key, index) => {
      return {label: key, value: key};
    });

    return data;
  };

  const handleCity_Data = values => {
    const data = values['state']
      ? stateRegion[values['state']].map(key => {
          return {label: key, value: key};
        })
      : [{label: 'State not Selected'}];

    return data;
  };

  const {loading, request} = useApi(updateUserData);

  const handleSubmit = (userNewLocation, {resetForm}) => {
    const {state, city, address} = userNewLocation;

    const dataToUpdate = {
      ...(state.toLowerCase() != initialValues.state.toLowerCase() && {
        [userDataTypes.STATE]: state,
      }),
      ...(city.toLowerCase() != initialValues.city.toLowerCase() && {
        [userDataTypes.CITY]: city,
      }),
      ...(address.toLowerCase() != initialValues.address.toLowerCase() && {
        [userDataTypes.ADDRESS]: address,
      }),
    };

    if (Object.entries(dataToUpdate).length) {
      request(user.id, dataToUpdate)
        .then(() => {
          resetForm();
          showToast(
            toast.types.SUCCESS,
            'User information successfully updated',
          );
          navigation.navigate(routes.ACCOUNT);
          const userNewInfo = {
            ...user,
            location: {
              state,
              city,
              address,
            },
          };
          setUser(userNewInfo);
        })
        .catch(error => {
          showToast(toast.types.ERROR, formatErrorMessage(error));
        });
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} portal />
      <Screen>
        <View style={styles.headerContainer}>
          <AppText style={styles.mainHeader}>Location Information</AppText>
        </View>
        <View style={styles.container}>
          <AppText style={styles.header}>Edit Location</AppText>
          <AppText style={styles.subHeader}>
            You can update your current Location below.
          </AppText>
          <AppForm
            initialValues={initialValues}
            validationSchema={validation}
            enableReinitialize
            validateOnMount={true}
            onSubmit={handleSubmit}>
            <View style={[styles.formContainer]}>
              <AppFormSelectInput
                name={'state'}
                onHandleData={handleState_Data}
                placeholder="Select State"
                valueResetNames={['city']}
                searchPlaceholder="Search State..."
              />
              <AppFormSelectInput
                name={'city'}
                onHandleData={handleCity_Data}
                placeholder="Select City"
                searchPlaceholder="Search City..."
              />
              <AppFormTextArea
                autoCapitalize="words"
                autoCorrect={false}
                name="address"
                placeholder="Address"
                textContentType="fullStreetAddress"
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
    alignItems: 'flex-end',
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
    fontSize: fontSz(15),
    fontFamily: fonts.bold,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: fontSz(10),
    color: colors.grey_dark_4,
    fontFamily: fonts.bold,
    marginBottom: 5,
  },
});

export default AddressBookScreen;
