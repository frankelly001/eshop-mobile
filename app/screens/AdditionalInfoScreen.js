import React, {useContext, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AppText from '../components/AppText';
import AppForm from '../components/form/AppForm';
import AppFormInput from '../components/form/AppFormInput';
import AppFormSelectInput from '../components/form/AppFormSelectInput';
import AppFormTextArea from '../components/form/AppFormTextArea';
import SubmitButton from '../components/form/SubmitButton';
import validationSchema from '../components/form/validationSchema';
import fonts from '../config/fonts';
import {fontSz} from '../config/responsiveSize';
import stateRegion from '../utilities/stateRegion';
import * as Yup from 'yup';
import colors from '../config/colors';
import AppGradientBtn from '../components/AppGradientBtn';
import AppFormValidateIndicator from '../components/form/AppFormValidateIndicator';
import routes from '../navigation/routes';
import toast from '../components/AppToast/toast';
import {showToast} from '../components/AppToast/showToast';
import {useApi} from '../hooks/useApi';
import ActivityIndicator from '../components/ActivityIndicator';
import {addUser} from '../api/setup/postApi/addUser';
import AuthContext from '../auth/AuthContext';
import {addUserBySocialAuth} from '../api/setup/authApi/register';
import {convertToCurrentDateAndTime} from '../utilities/convertToReadableDate';

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
      email: validationSchema.email,
      phone: validationSchema.phone,
      additional_phone: validationSchema.additional_phone,
    };
  else
    schema = {
      state: validationSchema.state,
      city: validationSchema.city,
      address: validationSchema.address,
    };

  return Yup.object().shape(schema);
};

const MultiStepFormWizard = ({step, onPrev, disAbleEmailField}) => {
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

  switch (step) {
    case 1:
      return (
        <View style={[styles.wizardformContainer, {justifyContent: 'center'}]}>
          <AppFormInput
            autoCapitalize="none"
            autoCorrect={false}
            name="firstname"
            placeholder="Firstname"
            textContentType="name"
          />
          <AppFormInput
            autoCapitalize="none"
            autoCorrect={false}
            name="lastname"
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

          <SubmitButton
            label="Next"
            containerStyle={styles.btnContainerStyle}
          />
        </View>
      );

    case 2:
      return (
        <View style={styles.wizardformContainer}>
          <AppFormInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            name="email"
            editable={disAbleEmailField}
            placeholder="Email"
            textContentType="emailAddress"
          />
          <AppFormInput
            keyboardType="numeric"
            name="phone"
            placeholder="Phone"
            textContentType={'telephoneNumber'}
          />
          <AppFormInput
            keyboardType="numeric"
            name="additional_phone"
            placeholder="Additional Phone (Optional)"
            textContentType={'telephoneNumber'}
          />
          <AppGradientBtn
            label="Back"
            onPress={() => onPrev()}
            containerStyle={styles.btnContainerStyle}
          />
          <SubmitButton
            label="Next"
            containerStyle={styles.btnContainerStyle}
          />
        </View>
      );

    case 3:
      return (
        <View style={styles.wizardformContainer}>
          <AppFormSelectInput
            name={'state'}
            // data={stateList}
            onHandleData={handleState_Data}
            placeholder="Select State"
            valueResetNames={['city']}
            searchPlaceholder="Search State..."
          />
          <AppFormSelectInput
            name={'city'}
            // data={lga}
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
          <AppGradientBtn
            label="Back"
            onPress={() => onPrev()}
            containerStyle={styles.btnContainerStyle}
          />
          <SubmitButton
            label="Done"
            containerStyle={styles.btnContainerStyle}
            // onSaveValues={setValidatedValues}
          />
        </View>
      );

    default:
      showToast(toast.types.ERROR, 'Something went wrong');
  }
};

const AdditionalInfoScreen = ({route}) => {
  const [step, setStep] = useState(1);
  const {loading, request} = useApi(addUserBySocialAuth);
  const {setUser} = useContext(AuthContext);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const {firstname, lastname, email, phone, verified, uid} = route.params;

  const initialValues = {
    firstname,
    lastname,
    gender: '',
    email,
    phone,
    additional_phone: '',
    state: '',
    city: '',
    address: '',
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
        email: true,
        phone: true,
        additional_phone: true,
      };
    } else {
      touched = {
        state: true,
        city: true,
        address: true,
      };
    }
    return touched;
  };

  const formatUserData = (userInfo, emailVerified) => {
    return {
      date: convertToCurrentDateAndTime(Date.now()),
      id: userInfo.id,
      name: {
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
      },
      gender: userInfo.gender,
      email: userInfo.email,
      phone: {
        phone: userInfo.phone,
        additional_phone: userInfo.additional_phone,
      },
      location: {
        state: userInfo.state,
        city: userInfo.city,
        address: userInfo.address,
        geolocation: {long: 53.483959, lat: -2.244644},
      },
      cart_items: [],
      saved_items: [],
      account_bal: 0,
      verified: emailVerified,
    };
  };

  const handleSubmit = (userInfo, {resetForm, setTouched}) => {
    setTouched(handleTouched(step));
    if (step !== 3) return nextStep();

    request(uid, userInfo, verified)
      .then(() => {
        const userData = formatUserData({...userInfo, id: uid}, verified);
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
      .catch(error => {});
  };

  return (
    <>
      <ActivityIndicator visible={loading} portal />
      <View style={styles.container}>
        <AppText style={styles.authLabel}>Complete Sign up</AppText>
        <AppText style={styles.welcome}>
          Please provide us your additional Information, that are not available
          below
        </AppText>
        <AppForm
          enableReinitialize
          validateOnMount
          initialValues={initialValues}
          validationSchema={handleValidation(step)}
          onSubmit={handleSubmit}>
          <AppFormValidateIndicator currentStep={step} numOfFormStep={3} />
          <MultiStepFormWizard
            onPrev={prevStep}
            step={step}
            disAbleEmailField={!email}
          />
          {/* <View style={[styles.container, {justifyContent: 'center'}]}> */}
        </AppForm>
      </View>
    </>
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
    color: colors.grey_dark_4,
    marginBottom: 5,
  },
  authLabel: {
    fontSize: fontSz(15),
    fontFamily: fonts.bold,
    marginBottom: 10,
  },
  wizardformContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  btnContainerStyle: {
    width: '49%',
    marginVertical: 10,
  },
});

export default AdditionalInfoScreen;
