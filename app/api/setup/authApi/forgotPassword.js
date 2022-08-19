import {formatErrorMessage} from '../../../utilities/formatErrorMessage';
import {auth} from '../config';

export const forgotPassword = email => {
  return new Promise((resolve, reject) => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        resolve('An email has been sent to you for Password Reset');
      })
      .catch(error => {
        reject(formatErrorMessage(error));
      });
  });
};
