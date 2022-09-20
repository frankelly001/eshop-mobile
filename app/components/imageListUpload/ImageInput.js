import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';

const ImageInput = ({
  imageUri,
  onChangeImage,
  cropWidth = 400,
  cropHeight = 400,
  containerStyles,
  iconSize = 40,
}) => {
  const handlePress = () => {
    if (!imageUri) selectedImage();
    else
      Alert.alert('Delete', `Are you sure you want to delete this image?`, [
        {text: 'Yes', onPress: () => onChangeImage()},
        {text: 'No'},
      ]);
  };

  const selectedImage = async () => {
    ImagePicker.openPicker({
      width: cropWidth,
      height: cropHeight,
      cropping: true,
      //   multiple: true,
    })
      .then(image => {
        // console.log(typeof image.path, 'heyyyyyyyyyyyyyy');
        onChangeImage(image.path);
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

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[styles.container, containerStyles]}>
        {!imageUri && (
          <MaterialCommunityIcons
            name="camera"
            color={colors.grey_dark}
            size={iconSize}
          />
        )}
        {imageUri && (
          <Image
            source={{uri: imageUri}}
            resizeMode="stretch"
            style={styles.image}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: colors.grey_light,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageInput;
