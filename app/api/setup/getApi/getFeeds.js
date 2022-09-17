import collectionRefs from '../collectionRefs';

export const getFeeds = () => {
  return collectionRefs.feedsCollectionRef.get();
};
