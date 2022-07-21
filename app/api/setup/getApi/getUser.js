import collectionRefs from '../collectionRefs';
import {firestore} from '../config';

export const getUser = userId => {
  return collectionRefs.usersCollectionRef.doc(userId).get();
};
