import {auth} from '../config';
import {addUser} from '../postApi/addUser';

export const signup = userInfo => {
  const {email, password} = userInfo;

  return new Promise(function (resolve, reject) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(snapshot => {
        // console.log(snapshot, 'User created successful');
        addUser(snapshot.user.uid, userInfo, snapshot.user.emailVerified)
          .then(snapshot => {
            resolve(snapshot);
          })
          .catch(error => {
            reject(error.message);
            console.log('ADD_USER ERROR:', error.message);
          });
        //   handleVerification(snapshot.user.email);
      })
      .catch(error => {
        reject(error.message);
        console.log(
          'CREATE_USER_WITH_EMAIL_AND_PASSWORD ERROR:',
          error.message,
        );
      });
    // console.log(email, password);
  });
};
