import collectionRefs from '../collectionRefs';

export const addFeed = (feedId, feedDetails) => {
  return collectionRefs.feedsCollectionRef.doc(feedId).set(feedDetails);
};
