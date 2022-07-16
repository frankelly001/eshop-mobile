import {firestore} from '../config';

const categoryCollectionRef = firestore().collection('categories');

export const getCategories = () => {
  return categoryCollectionRef.get();
};
