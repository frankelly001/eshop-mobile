import collectionRefs from '../collectionRefs';

export const deleteFeed = feedId => {
  return collectionRefs.feedsCollectionRef.doc(feedId).delete();
};
