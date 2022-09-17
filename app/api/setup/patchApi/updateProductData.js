import collectionRefs from '../collectionRefs';

export const productDataTypes = {
  TITLE: 'title',
  PRICE: 'price',
  IMAGES: 'images',
  CATEGORYTITLE: 'category.title',
  CATEGORYGROUPTITLE: 'category.group.title',
  CATEGORYGROUPTYPE: 'category.group.type',
  DESCRIPTION: 'description',
};

export const updateProductData = (productId, data) => {
  return collectionRefs.productsCollectionRef.doc(productId).update(data);
};
