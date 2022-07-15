import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const turnOfLocalPersistence = async () => {
  try {
    await firestore().settings({persistence: false});
  } catch (error) {
    console.warn('failed to clear persistence ', error.message);
  }
};

export {firestore, auth, turnOfLocalPersistence};
