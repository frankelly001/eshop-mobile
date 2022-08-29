import collectionRefs from '../collectionRefs';
import {firestore} from '../config';

export const addUser = (userId, userInfo, verified) => {
  return collectionRefs.usersCollectionRef.doc(userId).set({
    date: firestore.FieldValue.serverTimestamp(),
    name: {
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
    },
    gender: userInfo.gender,
    email: userInfo.email,
    phone: {
      phone: userInfo.phone,
      additional_phone: userInfo.additional_phone,
    },
    location: {
      state: userInfo.state,
      city: userInfo.city,
      address: userInfo.address,
      geolocation: new firestore.GeoPoint(53.483959, -2.244644),
    },
    cart_items: [],
    saved_items: [],
    account_bal: 0,
    verified,
  });
};
