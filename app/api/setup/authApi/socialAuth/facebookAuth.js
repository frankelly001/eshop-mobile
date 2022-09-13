import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {auth} from '../../config';
import {getUser} from '../../getApi/getUser';

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
    // LoginManager.logOut();
    onFacebookButtonPress()
      .then(snapshot => {
        if (snapshot.additionalUserInfo.isNewUser) {
          // console.log('Am a new User', snapshot);
          resolve({
            newUser: snapshot.additionalUserInfo?.isNewUser,
            snapshot,
          });
        } else {
          getUser(snapshot.user.uid).then(response => {
            if (!response._data) {
              resolve({
                newUser: true,
                snapshot,
              });
            } else {
              const data = {
                id: snapshot.user.uid,
                ...response._data,
                verified: snapshot.user?.emailVerified,
              };

              resolve({
                newUser: snapshot.additionalUserInfo?.isNewUser,
                snapshot: data,
              });
            }
          });
        }
      })
      .catch(error => {
        if (error) reject(formatErrorMessage(error));
      });
  }).catch(error => {
    if (error) reject(formatErrorMessage(error));
  });
};
