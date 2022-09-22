import {formatErrorMessage} from '../../../utilities/formatErrorMessage';
import {auth} from '../config';
import {addUser} from '../postApi/addUser';

export const signup = userInfo => {
  const {email, password} = userInfo;

  return new Promise(function (resolve, reject) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(snapshot => {
        addUser(snapshot.user.uid, userInfo, snapshot.user.emailVerified)
          .then(snapshot => {
            resolve(snapshot);
          })
          .catch(error => {
            auth()
              .currentUser.delete()
              .then(response => {
                reject(formatErrorMessage(error));
              });
          });
      })
      .catch(error => {
        reject(formatErrorMessage(error));
      });
  });
};

export const addUserBySocialAuth = (userId, userInfo, emailVerified) => {
  return new Promise(function (resolve, reject) {
    addUser(userId, userInfo, emailVerified)
      .then(snapshot => {
        resolve(snapshot);
      })
      .catch(error => {
        reject(formatErrorMessage(error));
      });
  });
};
