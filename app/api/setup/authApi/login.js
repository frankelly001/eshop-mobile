import {auth} from '../config';
import {getUser} from '../getApi/getUser';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const loginWithEmailAndPassword = ({email, password}) => {
  return new Promise(function (resolve, reject) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(snapshot => {
        getUser(snapshot.user.uid)
          .then(response => {
            if (!response._data)
              return auth()
                .currentUser.delete()
                .then(response => {
                  console.log('Account deleted', response);
                  reject(
                    "Sorry your account has been deleted, Because it's Invalid or not properly registered, Please create a new account.",
                  );
                });
            // return reject('User is authenticated, but not found in Database');

            const data = {
              id: snapshot.user.uid,
              ...response._data,
              verified: snapshot.user.emailVerified,
            };
            resolve(data);
            // console.log(response, 'check response.............');
          })
          .catch(error => {
            reject(error.message);
            console.log('GET_USER ERROR:', error.message);
          });
        // resolve(snapshot);
      })
      .catch(error => {
        reject(error.message);
        console.log('LOGIN_WITH_EMAIL_AND_PASSWORD ERROR:', error.message);
      });
  });
};

// export const loginWithEmailAndPassword = ({email, password}) => {
//   return new Promise(function (resolve, reject) {
//     auth()
//       .signInWithEmailAndPassword(email, password)
//       .then(snapshot => {
//         // console.log('success login', snapshot.user.uid);
//         getUser(snapshot.user.uid)
//           .then(data => {
//             resolve(data);
//           })
//           .catch(error => {
//             reject(error);
//           });
//         resolve(snapshot);
//       })
//       .catch(error => {
//         // console.log('Error:', error);
//         reject(error);
//       });
//   });
// };
