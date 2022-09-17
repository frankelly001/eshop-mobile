import collectionRefs from '../collectionRefs';

export const addCategory = (categoryId, categoryDetails) => {
  return collectionRefs.categoryCollectionRef
    .doc(categoryId)
    .set(categoryDetails);
};
