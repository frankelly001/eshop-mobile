import Toast from 'react-native-toast-message';

///this function basically calls a reuseable toast method.
export const showToast = (toastType, message) => {
  console.log('am logging.....');
  return Toast.show({
    type: 'appToast',
    text1: 'Hello',
    text2: message,
    props: {toastType},
  });
};
