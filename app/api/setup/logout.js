import {removeUserData} from '../storage/authStorage';
import {auth} from './config';

export const logoutUser = () => {
  return new Promise(function (resolve, reject) {
    auth()
      .signOut()
      .then(data => {
        removeUserData()
          .then(() => {
            console.log('data deleted');
          })
          .catch(error => {
            console.log(error.message, 'am from remove data');
          });
        resolve('User Succesfully sign Out', data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
