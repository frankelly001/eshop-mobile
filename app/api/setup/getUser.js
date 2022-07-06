const {firestore} = require('./config');

const usersCollectionRef = firestore().collection('users');

export const getUser = userId => {
  return new Promise(function (resolve, reject) {
    usersCollectionRef
      .doc(userId)
      .get()
      .then(snapshot => {
        // console.log('success', snapshot.data());
        resolve(snapshot);
      })
      .catch(error => {
        // console.log(error);
        reject(error);
      });
  });
};

// export const getUser = async userId => {
//   return await usersCollectionRef.doc(userId).get();
// };
