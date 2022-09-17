import {firestore} from './config';

const getCollectionRef = ref => {
  return firestore().collection(ref);
};

export default {
  usersCollectionRef: getCollectionRef('users'),
  productsCollectionRef: getCollectionRef('products'),
  categoryCollectionRef: getCollectionRef('categories'),
  usersOrderCollectionRef: getCollectionRef('users_order'),
  feedsCollectionRef: getCollectionRef('feeds'),
  carouselCollectionRef: getCollectionRef('carousel'),
};
