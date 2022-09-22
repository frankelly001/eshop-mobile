import {auth} from '../config';
import {getUser} from '../getApi/getUser';
import {formatErrorMessage} from '../../../utilities/formatErrorMessage';

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
                .then(() => {
                  reject(
                    "Sorry your account has been deleted, Because it's Invalid or not properly registered, Please create a new account.",
                  );
                });

            const data = {
              id: snapshot.user.uid,
              ...response._data,
              verified: snapshot.user.emailVerified,
            };
            resolve(data);
          })
          .catch(error => {
            reject(formatErrorMessage(error));
          });
      })
      .catch(error => {
        reject(formatErrorMessage(error));
      });
  });
};
