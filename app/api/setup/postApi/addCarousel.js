import collectionRefs from '../collectionRefs';

export const addCarousel = (feedId, feedDetails) => {
  return collectionRefs.carouselCollectionRef.doc(feedId).set(feedDetails);
};
