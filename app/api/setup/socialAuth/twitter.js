// import { NativeModules } from 'react-native';
// const { RNTwitterSignIn } = NativeModules;
// import auth from '@react-native-firebase/auth';

// RNTwitterSignIn.init('TWITTER_CONSUMER_KEY', 'TWITTER_CONSUMER_SECRET').then(() =>
//   console.log('Twitter SDK initialized'),
// );

// async function onTwitterButtonPress() {
//     // Perform the login request
//     const { authToken, authTokenSecret } = await RNTwitterSignIn.logIn();

//     // Create a Twitter credential with the tokens
//     const twitterCredential = auth.TwitterAuthProvider.credential(authToken, authTokenSecret);

//     // Sign-in the user with the credential
//     return auth().signInWithCredential(twitterCredential);
// }
