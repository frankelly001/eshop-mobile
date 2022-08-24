import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {auth} from '../../config';

async function onFacebookButtonPress() {
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );

  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
}

export const facebookSignin = async () => {
  return new Promise((resolve, reject) => {
    LoginManager.logOut();
    onFacebookButtonPress()
      .then(snapshot => {
        resolve(snapshot);
        console.log('Signed in with Facebook!', snapshot);
      })
      .catch(error => {
        reject(error);
        console.log(error);
      });
  });
};
