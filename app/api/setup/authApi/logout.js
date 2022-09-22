import {authStorageKeys, removeUserData} from '../../storage/authStorage';
import {auth} from '../config';

export const logoutUser = () => {
  return new Promise(function (resolve, reject) {
    removeUserData(authStorageKeys.USER_DATA)
      .then(() => {
        auth()
          .signOut()
          .then(() => {
            resolve('User Succesfully Logged out');
          })
          .catch(error => {
            reject(formatErrorMessage(error));
          });
      })
      .catch(error => {
        reject(error.message);
      });
  });
};
