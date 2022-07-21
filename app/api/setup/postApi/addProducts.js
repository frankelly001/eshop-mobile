import collectionRefs from '../collectionRefs';
import {firestore} from '../config';

export const addProducts = productDetails => {
  return collectionRefs.productsCollectionRef.add(productDetails);
};
