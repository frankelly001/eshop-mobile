import collectionRefs from '../collectionRefs';

export const deleteCarousel = carouselId => {
  return collectionRefs.carouselCollectionRef.doc(carouselId).delete();
};
