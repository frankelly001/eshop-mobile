import collectionRefs from '../collectionRefs';

export const updateUserData = (transactionId, data) => {
  return collectionRefs.usersOrderCollectionRef.doc(transactionId).update(data);
};
