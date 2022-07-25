import Toast from 'react-native-toast-message';

///this function basically calls a reuseable toast method.
export const showToast = (message = 'Network Error', toastType = 'kkkkkkk') => {
  console.log('am logging.....');
  return Toast.show({
    type: 'error',
    text1: 'Hello',
    text2: "wow it's now working",
    // props: {toastType: toastType},
  });
};
