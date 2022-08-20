import React, {useContext, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {facebookSignin} from '../api/setup/authApi/socialAuth/facebookAuth';
import {LoginInwithGoogle} from '../api/setup/authApi/socialAuth/googleAuth';
import {authStorageKeys, storeUserData} from '../api/storage/authStorage';
import AuthContext from '../auth/AuthContext';
import {wp} from '../config/responsiveSize';
import {useApi} from '../hooks/useApi';
import {formatErrorMessage} from '../utilities/formatErrorMessage';
import {FacebookIcon, GoogleIcon, TwitterIcon} from '../utilities/icons';
import ActivityIndicator from './ActivityIndicator';
import AppText from './AppText';
import {showToast} from './AppToast/showToast';
import toast from './AppToast/toast';

const SocialAuthentication = ({authLabel}) => {
  const {setUser} = useContext(AuthContext);
  //   const [loading, setLoading] = useState(false);

  const socialAuth = {
    google: LoginInwithGoogle,
    facebook: facebookSignin,
  };

  const {loading: googleLoading, request: googleRequest} =
    useApi(LoginInwithGoogle);
  const {loading: facebookLoading, request: facebookRequest} =
    useApi(facebookSignin);

  const handleGoogleAuth = () => {
    googleRequest().then(response => {
      if (response.newUser) {
        console.log('Am a new User', response);
      } else {
        showToast(
          toast.types.SUCCESS,
          `Welcome ${response.snapshot?.name.firstname}${
            !response.snapshot.verified ? ', Please Verify your Account' : ''
          }`,
        );
        storeUserData(authStorageKeys.USER_DATA, response.snapshot);
        setUser(response.snapshot);
      }
    });
  };

  const handleFacebookAuth = () => {
    facebookRequest()
      .then(snapshot => {
        console.log('Success', snapshot);
      })
      .then(error => {
        console.log('Error:', error);
      });
  };

  const handleTwitterAuth = () => {
    showToast(
      toast.types.INFO,
      'Sorry! Twitter authentication is not yet available',
    );
  };

  return (
    <>
      <ActivityIndicator portal visible={googleLoading || facebookLoading} />
      <View style={styles.socialContainer}>
        <AppText style={styles.linkLabel}>Or {authLabel} with</AppText>
        <View style={styles.handlesContainer}>
          <TouchableOpacity onPress={() => handleFacebookAuth()}>
            <FacebookIcon width={wp(35)} height={wp(35)} margin={10} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleGoogleAuth()}>
            <GoogleIcon width={wp(35)} height={wp(35)} margin={10} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTwitterAuth()}>
            <TwitterIcon width={wp(35)} height={wp(40)} margin={10} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  socialContainer: {
    width: '100%',
    justifyContent: 'center',
    // backgroundColor: 'yellow',
    marginTop: 30,
  },
  linkLabel: {
    marginTop: 10,
    textAlign: 'center',
  },
  handlesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SocialAuthentication;
