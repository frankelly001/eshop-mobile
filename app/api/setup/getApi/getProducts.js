import collectionRefs from '../collectionRefs';
import {firestore} from '../config';

export const getProducts = () => {
  return collectionRefs.productsCollectionRef.get();
};
