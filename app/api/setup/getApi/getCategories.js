import collectionRefs from '../collectionRefs';

export const getCategories = () => {
  return collectionRefs.categoryCollectionRef.get();
};
