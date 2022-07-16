import {firestore} from '../config';

const productsCollectionRef = firestore().collection('products');

export const addProducts = productDetails => {
  return productsCollectionRef.add(productDetails);
};
