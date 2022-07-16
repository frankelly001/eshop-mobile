import {removeUserData} from '../../storage/authStorage';
import {auth} from '../config';

export const logoutUser = () => {
  return new Promise(function (resolve, reject) {
    auth()
      .signOut()
      .then(data => {
        removeUserData()
          .then(() => {
            console.log('data deleted');
            resolve('User Succesfully sign Out');
          })
          .catch(error => {
            reject(error.message);
            console.log('ASYNC_STORAGE REMOVE_USER_DATA ERROR', error.message);
          });
      })
      .catch(error => {
        reject(error.message);
        console.log('SIGN OUT ERROR:', error.message);
      });
  });
};
