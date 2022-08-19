import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {auth} from '../../config';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
  webClientId:
    '55467029004-jo4ssf47lkg4e482m5elgcevf0or1dgs.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export const SignOutwithGoogle = () => {
  return new Promise((resolve, reject) => {
    GoogleSignin.signOut()
      .then(snapshot => {
        resolve(snapshot);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const LoginInwithGoogle = () => {
  return new Promise((resolve, reject) => {
    SignOutwithGoogle()
      .then(() => {
        onGoogleButtonPress()
          .then(snapshot => {
            resolve(snapshot);
            // console.log(snapshot, 'google sign in successful');
          })
          .catch(error => {
            reject(error);
            // console.log(error, 'google sign in failed');
          });
      })
      .catch(error => {
        reject(error);
      });
  });
};
