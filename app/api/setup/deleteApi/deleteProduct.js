import collectionRefs from '../collectionRefs';

export const deleteProduct = productId => {
  return collectionRefs.productsCollectionRef.doc(productId).delete();
};
