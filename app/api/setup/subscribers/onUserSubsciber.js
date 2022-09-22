import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

const onUserSubscriber = user => {
  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(user.id)
      .onSnapshot(documentSnapshot => {});

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [user.id]);
};
