import collectionRefs from '../collectionRefs';

export const userDataTypes = {
  GENDER: 'gender',
  FIRSTNAME: 'name.firstname',
  LASTNAME: 'name.lastname',
  VERIFIED: 'verified',
  ACCOUNT_BAL: 'account_bal',
  ADDRESS: 'location.address',
  CITY: 'location.city',
  STATE: 'location.state',
  PHONE: 'phone.phone',
  ADDITIONAL_PHONE: 'phone.addtional_phone',
  SAVED_ITEMS: 'saved_items',
  ORDERED_ITEMS: 'odered_items',
};

export const updateUserData = (userId, data) => {
  return collectionRefs.usersCollectionRef.doc(userId).update(data);
};
