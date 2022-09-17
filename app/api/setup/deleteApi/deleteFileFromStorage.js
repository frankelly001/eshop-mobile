import storage from '@react-native-firebase/storage';
import {showToast} from '../../../components/AppToast/showToast';
import toast from '../../../components/AppToast/toast';
import {formatErrorMessage} from '../../../utilities/formatErrorMessage';
import {dirNames} from '../uploadFile';

// export const deleteFileFromStorage = urlRef => {
//   const imgRef = urlRef
//     .replace(
//       'https://firebasestorage.googleapis.com/v0/b/eshop-89a63.appspot.com/o/',
//       '',
//     )
//     .split('?alt=media&token')[0]
//     .replace(/%2F/g, '/')
//     .replace(/%20/g, ' ');
//   return storage().ref(imgRef).delete();
// };
export const deleteFileFromStorage = (urlRef, product) => {
  const valueRefs = {
    title: product?.title.toLowerCase(),
    category: product?.category?.title.toLowerCase(),
    categoryGroupTitle: product?.category?.group?.title.toLowerCase(),
    categoryGroupType: product?.category?.group?.type.toLowerCase(),
  };
  return new Promise((resolve, reject) => {
    const imgUrlRef = urlRef
      .replace(
        'https://firebasestorage.googleapis.com/v0/b/eshop-89a63.appspot.com/o/',
        '',
      )
      .split('?alt=media&token')[0]
      .replace(/%2F/g, '/')
      .split('/');
    //   .replace(/%20/g, ' ')
    //   .replace(/%26/g, '')

    const filename = imgUrlRef[imgUrlRef.length - 1];

    const imgRef = `${dirNames.PRODUCTS_IMAGES}/${valueRefs['category']}/${
      valueRefs['categoryGroupTitle']
    }/${
      valueRefs['categoryGroupType'] ? `${valueRefs['categoryGroupType']}/` : ''
    }${valueRefs['title'].replace(/[^A-Z0-9']+/gi, '-')}/${filename}`;

    storage()
      .ref(imgRef)
      .delete()
      .then(() => {
        showToast(toast.types.SUCCESS, 'Image File deleted successfully');
        resolve('File deleted Successfully');
      })
      .catch(error => {
        showToast(toast.types.ERROR, formatErrorMessage(error));
        reject(error);
      });
  });
};
