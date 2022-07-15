import {firestore} from '../config';

const categoryCollectionRef = firestore().collection('categories');

export const getCategories = () => {
  return new Promise(function (resolve, reject) {
    categoryCollectionRef
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
