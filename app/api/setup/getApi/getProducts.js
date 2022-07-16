import {firestore} from '../config';

const productsCollectionRef = firestore().collection('products');

export const getProducts = () => {
  return productsCollectionRef.get();
};
