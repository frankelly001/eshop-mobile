import collectionRefs from '../collectionRefs';

export const addProducts = productDetails => {
  return collectionRefs.productsCollectionRef.add(productDetails);
};
