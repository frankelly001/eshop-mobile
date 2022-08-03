import React, {useContext, useEffect, useState} from 'react';
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
import {loginWithEmailAndPassword} from '../api/setup/authApi/login';
import {useApi} from '../hooks/useApi';
import AuthContext from '../auth/AuthContext';
import ActivityIndicator from '../components/ActivityIndicator';
import {authStorageKeys, storeUserData} from '../api/storage/authStorage';
import {showToast} from '../components/AppToast/showToast';
import toast from '../components/AppToast/toast';
// import navigation from '../navigation/rootNavigation';

// GoogleSignin.configure({
//   scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
//   webClientId:
//     '55467029004-jo4ssf47lkg4e482m5elgcevf0or1dgs.apps.googleusercontent.com',
// });

// ./gradlew signingReport
// keytool -keystore debug.keystore -list -v
// keytool -genkey -v -keystore debug.keystore -alias androiddebugkey -storepass android -keypass android -keyalg RSA -validity 10000

// GoogleSignin.hasPlayServices({autoResolve: true})
//   .then(snapshot => {
//     console.log(snapshot, 'checking snapshot');
//   })
//   .catch(err => {
//     console.log(
//       'Play services code::>',
//       err.code,
//       'Play services message::>',
//       err.message,
//     );
//   });
const login_VS = Yup.object().shape({
  email: validationSchema.email,
  password: validationSchema.password,
});

const LoginScreen = ({navigation}) => {
  // const [user, setUser] = useState();
  // const productCollectionRef = firestore().collection('products');
  const {setUser} = useContext(AuthContext);
  // console.log(usersCollection);

  // const onFetchData = () => {
  //   productCollectionRef
  //     .get()
  //     .then(snapshot => {
  //       snapshot.forEach(el => {
  //         console.log(el.data());
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  // const handleVerification = () => {
  //   auth().onAuthStateChanged(user => {
  //     user
  //       .sendEmailVerification()
  //       .then(snapshot => {
  //         console.log(snapshot, 'success HV');
  //       })
  //       .catch(error => {
  //         console.log(error, 'error HV');
  //       });
  //   });
  // };
  // const signup = ({email, password}) => {
  //   auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(snapshot => {
  //       console.log(snapshot, 'heyyyy');
  //       handleVerification(snapshot.user.email);
  //     })
  //     .catch(error => {
  //       console.log(error, 'heyyy');
  //     });
  //   // console.log(email, password);
  // };

  // const logout = () => {
  //   auth().signOut();
  // };

  // const [func, setFunc] = useState(loginWithEmailAndPassword);

  // const onAuthStateChanged = user => {
  //   return user ? navigation.navigate(routes.ACCOUNT) : null;
  // };

  // const {data, error, loading, request} = useApi(loginWithEmailAndPassword);
  const {error, loading, request} = useApi(loginWithEmailAndPassword);
  // const [error, setError] = useState();

  const handleSubmit = (userInfo, {resetForm}) => {
    request(userInfo)
      .then(userData => {
        resetForm();
        setUser(userData);
        storeUserData(authStorageKeys.USER_DATA, userData);
        showToast(
          'success',
          `Welcome ${userData.name.firstname}${
            !userData.verified ? ', Please Verify your Account' : ''
          }`,
        );
      })
      .catch(error => {
        console.log(error);
      });
  };
  console.log(loading, 'Loading state');
  // const handleSubmit = userInfo => {
  //   loginWithEmailAndPassword(userInfo)
  //     .then(() => {
  //       alert('Sign in Successful');
  //       navigation.replace(routes.ACCOUNT);
  //     })
  //     .catch(error => {
  //       setError(error.message);
  //     });
  //   // request(userInfo);
  // };

  // useEffect(() => {
  // }, [user]);

  return (
    <>
      <ActivityIndicator visible={loading} portal />
      <AuthForm
        welcomeMessage="Welcome to Back!"
        authTypeLabel="Login"
        initialValues={{
          email: 'frankelly3344@gmail.com',
          password: '123456',
        }}
        validationSchema={login_VS}
        navigation={navigation}
        error={error}
        onSubmit={handleSubmit}>
        <View style={[styles.container, {justifyContent: 'center'}]}>
          <AppFormInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
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
            disable={loading}
            containerStyle={styles.btnContainerStyle}
          />
        </View>
        {/* <AppGradientBtn label="Sign in with Google" onPress={signInwithGoogle} />
      <AppGradientBtn label="Sign in with Facebook" onPress={facebookSignin} />
      <AppGradientBtn label="logout" onPress={logout} /> */}
        <TouchableOpacity style={{marginVertical: 10}}>
          <AppText style={styles.link}>Forgot Password?</AppText>
        </TouchableOpacity>
      </AuthForm>
    </>
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
  },
  btnLabel: {
    fontSize: fontSz(15),
  },
  link: {
    // fontFamily: fonts.bold,
    // marginTop: 5,
    color: colors.purple,
  },
});

export default LoginScreen;
