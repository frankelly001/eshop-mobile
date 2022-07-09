import storage from '@react-native-firebase/storage';
// import {showToast} from '../functions/commonFunctions';

export const dirNames = {
  PRODUCTS_IMAGES: 'product_images',
  FEED_IMAGES: 'feed_imgaes',
};

export const uploadFile = async (dirName, imageUri) => {
  console.log(' ready to uploadi this =>', imageUri);
  const uploadUri = imageUri;

  try {
    const filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    // setloading(true);
    // settransfered(0);
    const storageRef = storage().ref(`${dirName}/${filename}`);
    const task = storageRef.putFile(uploadUri);
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });

    await task;
    const url = await storageRef.getDownloadURL();
    console.log(`this is your image download url:  ${url}`);
    // setloading(false);
    // settransfered(null);
    return url;
  } catch (error) {
    console.log(error);
    // showToast('Failed', error.message, 'ERROR');
    console.log('upload error', error);

    return false;
  }
};
