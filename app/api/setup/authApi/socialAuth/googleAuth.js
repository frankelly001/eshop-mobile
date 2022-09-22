import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {formatErrorMessage} from '../../../../utilities/formatErrorMessage';
import {auth} from '../../config';
import {getUser} from '../../getApi/getUser';

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
            if (snapshot.additionalUserInfo.isNewUser) {
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
                    verified: snapshot.user.emailVerified,
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
      })
      .catch(error => {
        if (error) reject(formatErrorMessage(error));
      });
  });
};
