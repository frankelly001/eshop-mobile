import {authStorageKeys, removeUserData} from '../../storage/authStorage';
import {auth} from '../config';

export const logoutUser = () => {
  return new Promise(function (resolve, reject) {
    removeUserData(authStorageKeys.USER_DATA)
      .then(() => {
        auth()
          .signOut()
          .then(() => {
            console.log('data deleted');
            resolve('User Succesfully Logged out');
          })
          .catch(error => {
            reject(error.message);
            console.log('SIGN OUT ERROR:', error.message);
          });
      })
      .catch(error => {
        reject(error.message);
        console.log('ASYNC_STORAGE REMOVE_USER_DATA ERROR', error.message);
      });
  });
};
