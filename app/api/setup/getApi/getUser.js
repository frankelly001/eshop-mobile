import {firestore} from '../config';

const usersCollectionRef = firestore().collection('users');

export const getUser = userId => {
  return usersCollectionRef.doc(userId).get();
};
