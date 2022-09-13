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
  CART_ITEMS: 'cart_items',
  ORDERED_ITEMS: 'ordered_items',
};

export const updateUserData = (userId, data) => {
  return collectionRefs.usersCollectionRef.doc(userId).update(data);
};

// phone&tab.jpg
// computing2.jpg
// elect.jpeg

// fashion.jpg
// automobile.jpg
// home-office.jpg

// grocery.jpg
// baby.jpg

// health & beauty.jpg

// sporting.jpg
// others.jpg
