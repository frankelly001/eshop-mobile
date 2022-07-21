import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import {AccountDetails, AccountSettings} from '../api/account';
import {auth, firestore} from '../api/setup/config';
import {logoutUser} from '../api/setup/authApi/logout';
import AuthContext from '../auth/AuthContext';
import AppButton from '../components/AppButton';
import AppGradientBtn from '../components/AppGradientBtn';
import AppGradientText from '../components/AppGradientText';
import AppText from '../components/AppText';
import ListCard from '../components/ListCard';
import Screen from '../components/Screen';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontSz, wp} from '../config/responsiveSize';
import routes from '../navigation/routes';
import UploadScreen from './UploadScreen';
import {formatToCurrency} from '../utilities/formatToCurr';
import ActivityIndicator from '../components/ActivityIndicator';
import {useApi} from '../hooks/useApi';

const dimensions = Dimensions.get('screen');

const AccountScreen = ({navigation}) => {
  const {user, setUser, clearCartState} = useContext(AuthContext);

  const {loading, request} = useApi(logoutUser);

  const handleLogout = () => {
    request()
      .then(snapshot => {
        alert(snapshot);
        setUser(null);
        // clearCartState();
      })
      .catch(error => {
        alert(error);
      });
  };

  const press = () => {
    firestore()
      .collection('users')
      .doc(user.id)
      .update({
        ['name.lastname']: 'okeke',
      })
      .then(data => {
        console.log('success', data);
      })
      .then(error => {
        console.log('error', error.message);
      });
    // return userSubscriber();
  };

  return (
    <>
      <ActivityIndicator visible={loading} portal />
      <Screen>
        <View style={styles.welcomeContainer}>
          <View style={styles.subWelcomeContainer}>
            <AppGradientText
              style={[styles.welcome, {textTransform: 'capitalize'}]}>
              <AppGradientText style={[styles.welcome, styles.welcomeColor]}>
                Welcome{user ? ' ' : '!'}
              </AppGradientText>
              {user && user.name.firstname}
            </AppGradientText>
            <AppText style={styles.welcome}>
              {user ? user.email : `Enter your account`}
            </AppText>
          </View>
          {!user && (
            <View style={[styles.subWelcomeContainer, {flex: 0.5}]}>
              <AppButton
                label="Login"
                bgStyle={{borderRadius: 5}}
                onPress={() => navigation.navigate(routes.LOGIN)}
              />
            </View>
          )}
        </View>
        <View style={styles.actBalContainer}>
          {user ? (
            <>
              <AppText style={styles.actBalLabel}>Account Balance</AppText>
              <AppText style={[styles.actBalLabel, styles.bal]}>
                {formatToCurrency(user.account_bal)}
              </AppText>
            </>
          ) : (
            <AppText style={styles.actBalLabel}>Login to see Balance</AppText>
          )}
        </View>
        <ListCard data={AccountDetails} />
        <ListCard data={AccountSettings} />

        <TouchableOpacity
          onPress={
            user ? handleLogout : () => navigation.navigate(routes.LOGIN)
          }>
          <AppGradientText style={styles.logout}>
            {user ? 'Log out' : 'Log in'}
          </AppGradientText>
        </TouchableOpacity>
        {/* {ifUser ? (
        <TouchableOpacity on>
          <AppGradientText style={styles.logout}>Log out</AppGradientText>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <AppGradientText style={styles.logout}>Log in</AppGradientText>
        </TouchableOpacity>
      )} */}
      </Screen>
    </>
  );
};

const styles = StyleSheet.create({
  subWelcomeContainer: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  welcomeContainer: {
    width: '100%',
    height: 0.13 * dimensions.height,
    backgroundColor: colors.grey_light_2,
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  welcome: {
    // fontWeight: '700',
    fontSize: fontSz(13.5),

    // color: colors.grey_dark_3,
  },
  welcomeColor: {
    fontFamily: fonts.bold,
    // color: colors.purple,
  },
  actBalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.green,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  actBalLabel: {
    color: colors.white,
  },
  bal: {
    fontFamily: fonts.bold,
  },
  logout: {
    alignSelf: 'center',
    fontSize: fontSz(15),
    fontFamily: fonts.bold,
    margin: 30,
  },
});

export default AccountScreen;
