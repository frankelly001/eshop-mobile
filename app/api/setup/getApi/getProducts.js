import {firestore} from '../config';

const productsCollectionRef = firestore().collection('products');

export const getProducts = () => {
  return new Promise(function (resolve, reject) {
    productsCollectionRef
      .get()
      .then(snapshot => {
        resolve(snapshot);
      })
      .catch(error => {
        reject(error);
      });
  });
};
