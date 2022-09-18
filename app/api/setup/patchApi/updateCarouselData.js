import collectionRefs from '../collectionRefs';

export const carouselDataTypes = {
  TITLE: 'title',
  IMAGE: 'image',
};

export const updateCarouselData = (carouselId, data) => {
  return collectionRefs.carouselCollectionRef.doc(carouselId).update(data);
};
