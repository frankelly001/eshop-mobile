import collectionRefs from '../collectionRefs';
import {firestore} from '../config';

export const addUser = (userId, userInfo, verified) => {
  return collectionRefs.usersCollectionRef.doc(userId).set({
    date: firestore.FieldValue.serverTimestamp(),
    name: {
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
    },
    username: userInfo.username,
    email: userInfo.email,
    phone: {
      phone: userInfo.phone,
      addtional_phone: userInfo?.addtional_phone,
    },
    location: {
      state: userInfo.state,
      city: userInfo.city,
      address: userInfo.address,
      geolocation: new firestore.GeoPoint(53.483959, -2.244644),
    },
    odered_items: [],
    saved_items: [],
    account_bal: 0,
    verified,
  });
};
