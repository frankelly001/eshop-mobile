import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppGradientBtn from '../AppGradientBtn';
import ImagePicker from 'react-native-image-crop-picker';
import {uploadFile} from '../../api/setup/uploadFile';
import {firestore} from '../../api/setup/config';
// import NewPath from '../../assets/images/hoodie/1.jpg';

const ImageUploadTest = props => {
  // https://locus.fkkas.com/api/states
  // https://locus.fkkas.com/api/regions/imo
  const uploadImage = async () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
      multiple: true,
    })
      .then(image => {
        // console.log(typeof image.path, 'heyyyyyyyyyyyyyy');
        console.log(image);
        // uploadFile(image.path);
      })
      .catch(error => {
        console.log(error, 'failed.........');
      });
    // try {
    //   const result = await ImagePicker.launchImageLibraryAsync({
    //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //     quality: 0.5,
    //   });
    //   if (!result.cancelled) onChangeImage(result.uri);
    // } catch (error) {
    //   console.log("Error reading an Image", error);
    // }
  };

  const feedCollectionRef = firestore().collection('feed');

  const handleSubmit = () => {
    // const path = require('../../assets/images/hoodie/2.jpg');
    // console.log(NewPath);
  };

  return (
    <View style={styles.container}>
      <AppGradientBtn label="upload to firebase" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ImageUploadTest;
