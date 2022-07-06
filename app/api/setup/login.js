import {auth} from './config';
import {getUser} from './getUser';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const loginWithEmailAndPassword = ({email, password}) => {
  return new Promise(function (resolve, reject) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(snapshot => {
        // console.log('success login', snapshot.user.uid);
        // getUser(snapshot.user.uid)
        //   .then(data => {
        //     resolve(data);
        //   })
        //   .catch(error => {
        //     reject(error);
        //   });
        resolve(snapshot);
      })
      .catch(error => {
        // console.log('Error:', error);
        reject(error);
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
