import collectionRefs from '../collectionRefs';

export const addOrder = (transactionId, data) => {
  return collectionRefs.usersOrderCollectionRef.doc(transactionId).set(data);
};
