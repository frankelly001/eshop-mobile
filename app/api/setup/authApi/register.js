import {auth, firestore} from '../config';

const usersCollectionRef = firestore().collection('users');

const addUser = (userId, userInfo) => {
  usersCollectionRef
    .doc(userId)
    .set({
      date: firestore.FieldValue.serverTimestamp(),
      name: {
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
      },
      username: userInfo.username,
      email: userInfo.email,
      phone: {
        phone: userInfo.phone,
        addtional_phone: userInfo?.addtional_phone,
      },
      location: {
        state: userInfo.state,
        city: userInfo.city,
        address: userInfo.address,
        geolocation: new firestore.GeoPoint(53.483959, -2.244644),
      },
      odered_items: [],
      saved_items: [],
      account_bal: 0,
    })
    .then(snapshot => {
      alert('user registered successfully');
    })
    .catch(error => {
      alert('Error', error);
    });
};

export const signup = userInfo => {
  const {email, password} = userInfo;

  return new Promise(function (resolve, reject) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(snapshot => {
        // console.log(snapshot, 'User created successful');
        addUser(snapshot.user.uid, userInfo);
        resolve(snapshot);
        //   handleVerification(snapshot.user.email);
      })
      .catch(error => {
        // console.log('Error', error);
        reject(error);
      });
    // console.log(email, password);
  });
};
