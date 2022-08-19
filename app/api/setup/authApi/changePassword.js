import {formatErrorMessage} from '../../../utilities/formatErrorMessage';
import {auth} from '../config';

const reauthenticateUser = currentPassword => {
  const authUser = auth().currentUser;
  const cred = auth.EmailAuthProvider.credential(
    authUser.email,
    currentPassword,
  );

  return authUser.reauthenticateWithCredential(cred);
};

export const changePassword = (currentPassword, newPassword) => {
  const authUser = auth().currentUser;
  return new Promise((resolve, reject) => {
    reauthenticateUser(currentPassword)
      .then(() => {
        authUser
          .updatePassword(newPassword)
          .then(() => {
            resolve('Password Successfully Changed');
          })
          .catch(error => {
            reject(formatErrorMessage(error));
          });
      })
      .catch(error => {
        reject(
          error.code === 'auth/wrong-password'
            ? 'Current Password is Wrong'
            : formatErrorMessage(error),
        );
      });
  });
};
