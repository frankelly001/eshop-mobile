import {firestore} from '../config';

const productsCollectionRef = firestore().collection('products');

export const addProducts = productDetails => {
  return new Promise(function (resolve, reject) {
    productsCollectionRef
      .add(productDetails)
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
