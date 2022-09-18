import storage from '@react-native-firebase/storage';
import {showToast} from '../../../components/AppToast/showToast';
import toast from '../../../components/AppToast/toast';
import {formatErrorMessage} from '../../../utilities/formatErrorMessage';
import {dirNames} from '../uploadFile';

export const folderRefs = {
  PRODUCT: product => {
    const valueRefs = {
      title: product?.title.toLowerCase(),
      category: product?.category?.title.toLowerCase(),
      categoryGroupTitle: product?.category?.group?.title.toLowerCase(),
      categoryGroupType: product?.category?.group?.type.toLowerCase(),
    };

    return `${dirNames.PRODUCTS_IMAGES}/${valueRefs['category']}/${
      valueRefs['categoryGroupTitle']
    }/${
      valueRefs['categoryGroupType'] ? `${valueRefs['categoryGroupType']}/` : ''
    }${valueRefs['title'].replace(/[^A-Z0-9']+/gi, '-')}`;
  },
  FEED: dirNames.FEED_IMAGES,
  CAROUSEL: dirNames.CAROUSEL_IMAGES,
};

export const deleteFileFromStorage = (urlRef, fileFolderRef) => {
  return new Promise((resolve, reject) => {
    const fileUrlRef = urlRef
      .replace(
        'https://firebasestorage.googleapis.com/v0/b/eshop-89a63.appspot.com/o/',
        '',
      )
      .split('?alt=media&token')[0]
      .replace(/%2F/g, '/')
      .split('/');

    const filename = fileUrlRef[fileUrlRef.length - 1];

    const fileRef = `${fileFolderRef}/${filename}`;

    storage()
      .ref(fileRef)
      .delete()
      .then(() => {
        showToast(
          toast.types.SUCCESS,
          `${filename.split('.')[1].toUpperCase()} file deleted successfully`,
        );
        resolve('File deleted Successfully');
      })
      .catch(error => {
        showToast(toast.types.ERROR, formatErrorMessage(error));
        reject(error);
      });
  });
};

// export const deleteProductImageFileFromStorage = (urlRef, product) => {
//   const valueRefs = {
//     title: product?.title.toLowerCase(),
//     category: product?.category?.title.toLowerCase(),
//     categoryGroupTitle: product?.category?.group?.title.toLowerCase(),
//     categoryGroupType: product?.category?.group?.type.toLowerCase(),
//   };
//   return new Promise((resolve, reject) => {
//     const imgUrlRef = urlRef
//       .replace(
//         'https://firebasestorage.googleapis.com/v0/b/eshop-89a63.appspot.com/o/',
//         '',
//       )
//       .split('?alt=media&token')[0]
//       .replace(/%2F/g, '/')
//       .split('/');
//     //   .replace(/%20/g, ' ')
//     //   .replace(/%26/g, '')

//     const filename = imgUrlRef[imgUrlRef.length - 1];

//     const imgRef = `${dirNames.PRODUCTS_IMAGES}/${valueRefs['category']}/${
//       valueRefs['categoryGroupTitle']
//     }/${
//       valueRefs['categoryGroupType'] ? `${valueRefs['categoryGroupType']}/` : ''
//     }${valueRefs['title'].replace(/[^A-Z0-9']+/gi, '-')}/${filename}`;

//     storage()
//       .ref(imgRef)
//       .delete()
//       .then(() => {
//         showToast(toast.types.SUCCESS, 'Product image deleted successfully');
//         resolve('File deleted Successfully');
//       })
//       .catch(error => {
//         showToast(toast.types.ERROR, formatErrorMessage(error));
//         reject(error);
//       });
//   });
// };

// export const deleteFeedImageFileFromStorage = urlRef => {
//   return new Promise((resolve, reject) => {
//     const imgUrlRef = urlRef
//       .replace(
//         'https://firebasestorage.googleapis.com/v0/b/eshop-89a63.appspot.com/o/',
//         '',
//       )
//       .split('?alt=media&token')[0]
//       .replace(/%2F/g, '/')
//       .split('/');

//     const filename = imgUrlRef[imgUrlRef.length - 1];

//     const imgRef = `${dirNames.FEED_IMAGES}/${filename}`;

//     console.log(imgRef, 'let seeee');

//     storage()
//       .ref(imgRef)
//       .delete()
//       .then(() => {
//         showToast(toast.types.SUCCESS, 'Feed image deleted successfully');
//         resolve('File deleted Successfully');
//       })
//       .catch(error => {
//         showToast(toast.types.ERROR, formatErrorMessage(error));
//         reject(error);
//       });
//   });
// };

// export const deleteCarouselImageFileFromStorage = urlRef => {
//   return new Promise((resolve, reject) => {
//     const imgUrlRef = urlRef
//       .replace(
//         'https://firebasestorage.googleapis.com/v0/b/eshop-89a63.appspot.com/o/',
//         '',
//       )
//       .split('?alt=media&token')[0]
//       .replace(/%2F/g, '/')
//       .split('/');

//     const filename = imgUrlRef[imgUrlRef.length - 1];

//     const imgRef = `${dirNames.CAROUSEL_IMAGES}/${filename}`;

//     console.log(imgRef, 'let seeee');

//     storage()
//       .ref(imgRef)
//       .delete()
//       .then(() => {
//         showToast(toast.types.SUCCESS, 'Feed image deleted successfully');
//         resolve('File deleted Successfully');
//       })
//       .catch(error => {
//         showToast(toast.types.ERROR, formatErrorMessage(error));
//         reject(error);
//       });
//   });
// };
