import collectionRefs from '../collectionRefs';

export const feedDataTypes = {
  TITLE: 'title',
  IMAGE: 'image',
  DESCRIPTION: 'description',
};

export const updateFeedData = (feedId, data) => {
  return collectionRefs.feedsCollectionRef.doc(feedId).update(data);
};
