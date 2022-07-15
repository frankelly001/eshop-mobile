import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity} from 'react-native';
import {AccountDetails, AccountSettings} from '../api/account';
import {auth} from '../api/setup/config';
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

const dimensions = Dimensions.get('screen');

const AccountScreen = ({navigation}) => {
  // const [user, setUser] = useState(false);
  const {user} = useContext(AuthContext);

  // console.log(user, 'Account Screen');

  const handleLogout = () => {
    logoutUser()
      .then(snapshot => {
        alert(snapshot);
      })
      .catch(error => {
        alert(error);
      });
  };

  // console.log(user);

  // const onAuthStateChanged = user => {
  //   setUser(user);
  //   // console.log(user);
  // };

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber;
  // }, []);

  // if (1) return <UploadScreen />;

  return (
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
            <AppText style={[styles.actBalLabel, styles.bal]}>₦150,870</AppText>
          </>
        ) : (
          <AppText style={styles.actBalLabel}>Login to see Balance</AppText>
        )}
      </View>
      <ListCard data={AccountDetails} />
      <ListCard data={AccountSettings} />

      <TouchableOpacity
        onPress={user ? handleLogout : () => navigation.navigate(routes.LOGIN)}>
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
