import {firestore} from './config';

const productsCollectionRef = firestore().collection('products');

export const addProducts = productDetails => {
  productsCollectionRef
    .add(productDetails)
    .then(data => {
      console.log('product added successfully', data);
      alert('product added successfully');
    })
    .catch(error => {
      console.log('product add failed:', error);
    });
};
