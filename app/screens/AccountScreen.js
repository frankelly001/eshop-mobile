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
import {authStorageKeys, removeUserData} from '../api/storage/authStorage';
import Icon, {Icons} from '../components/Icons';
import ModalOverlay from '../components/ModalOverlay';
import AnimatedLottieView from 'lottie-react-native';
import MailSentNoticeModal from '../components/MailSentNoticeModal';
import {showToast} from '../components/AppToast/showToast';
import toast from '../components/AppToast/toast';
import {
  updateUserData,
  userDataTypes,
} from '../api/setup/patchApi/updateUserData';
import LogoutNotice from '../components/LogoutNotice';

const {height} = Dimensions.get('screen');

const AccountScreen = ({navigation}) => {
  const {user, setUser, setRecentQueries} = useContext(AuthContext);
  const [mailNotice, setMailNotice] = useState(false);
  const [logoutNotice, setLogoutNotice] = useState(false);

  const [intervalId, setIntervalId] = useState(null);
  const {loading, request} = useApi(logoutUser);

  const handleLogout = () => {
    request()
      .then(snapshot => {
        setLogoutNotice(false);
        showToast(toast.types.INFO, snapshot);
        setUser(null);

        // clearCartState();
      })
      .catch(error => {
        alert(error);
      });
    removeUserData(authStorageKeys.RECENT_QUERIES);
    setRecentQueries([]);
  };

  const updateUserData_verified = verification => {
    if (verification)
      updateUserData(user.id, {[userDataTypes.VERIFIED]: verification}).then(
        () => {
          showToast(toast.types.SUCCESS, 'Your account is now verified');
        },
      );
  };

  const stopAutoVerification = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const startAutoVerification = () => {
    const newIntervalId = setInterval(() => {
      auth()
        ?.currentUser?.reload()
        .then(() => {
          const userVerified = auth()?.currentUser?.emailVerified;
          if (userVerified) {
            updateUserData_verified(userVerified);
            // stopCurrentUserReload();
            setMailNotice(false);
            console.log('i am now  Verified!!!!!!!!!');
          } else {
            console.log('i am not  Verified');
          }
        });
    }, 2000);
    setIntervalId(newIntervalId);
  };

  useEffect(() => {
    // if (user?.verified) stopCurrentUserReload();
    if (mailNotice) {
      startAutoVerification();
    } else {
      stopAutoVerification();
    }
    return () => {};
  }, [mailNotice]);

  // useEffect(() => {
  //   if (user && !user.verified && userVerified) {
  //     updateUserData_verified();
  //     if (mailNotice) setMailNotice(false);
  //   }
  // }, [userVerified, mailNotice]);

  const handleVerification = () => {
    const userVerified = auth()?.currentUser?.emailVerified;
    if (user && !userVerified) {
      if (!mailNotice) setMailNotice(true);
      auth()
        .currentUser.sendEmailVerification()
        .then(() => {
          showToast(
            toast.types.INFO,
            'An email has been sent to you for Verification',
          );
        });
    } else if (user && userVerified) {
      updateUserData_verified(userVerified);
    }
  };

  // if (1) return <UploadScreen />;

  // console.log(user, 'make i check user');

  return (
    <>
      <ActivityIndicator visible={loading} portal />

      {user && (
        <MailSentNoticeModal
          email={user?.email}
          visible={mailNotice}
          onClose={() => setMailNotice(false)}
          onHandleResendMail={handleVerification}
        />
      )}

      <LogoutNotice
        visible={logoutNotice}
        onHandleLogout={handleLogout}
        onCancel={() => setLogoutNotice(false)}
      />
      <Screen
        contentContainerStyle={
          {
            // paddingBottom: 60
          }
        }>
        <View style={styles.welcomeContainer}>
          <View style={styles.subWelcomeContainer}>
            <View style={styles.span}>
              <AppGradientText style={[styles.welcome, styles.welcomeColor]}>
                Welcome{user ? ' ' : '!'}
              </AppGradientText>
              <AppGradientText
                style={[styles.welcome, {textTransform: 'capitalize'}]}>
                {user && user.name.firstname}
              </AppGradientText>
              {user && (
                <Icon
                  type={Icons.MaterialIcons}
                  name="verified-user"
                  size={13}
                  color={user.verified ? colors.green : colors.grey_dark}
                  style={{marginLeft: 2}}
                />
              )}
            </View>
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
          {user && !user.verified && (
            <View style={[styles.subWelcomeContainer, {flex: 0.5}]}>
              <AppButton
                label="Verify Account"
                bgStyle={{borderRadius: 5}}
                onPress={handleVerification}
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
          onPress={() =>
            user ? setLogoutNotice(true) : navigation.navigate(routes.LOGIN)
          }>
          <AppGradientText style={styles.logout}>
            {user ? 'Log out' : 'Log in'}
          </AppGradientText>
        </TouchableOpacity>
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
    height: 0.13 * height,
    backgroundColor: colors.white,
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
    fontFamily: fonts.semi_bold,
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
  span: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AccountScreen;
