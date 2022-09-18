import collectionRefs from '../collectionRefs';

export const addCarousel = (carouselId, carouselDetails) => {
  return collectionRefs.carouselCollectionRef
    .doc(carouselId)
    .set(carouselDetails);
};
