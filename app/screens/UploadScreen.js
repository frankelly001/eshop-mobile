import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppForm from '../components/form/AppForm';
import AppFormInput from '../components/form/AppFormInput';
import AppFormTextArea from '../components/form/AppFormTextArea';
import SubmitButton from '../components/form/SubmitButton';
import Screen from '../components/Screen';
import fonts from '../config/fonts';
import {fontSz} from '../config/responsiveSize';
import * as Yup from 'yup';
import validationSchema from '../components/form/validationSchema';
import AppText from '../components/AppText';
import AppFormImagePicker from '../components/form/AppFormImagePicker';
import ImageInputList from '../components/imageListUpload/ImageInputList';
import ImageUploadTest from '../components/imageListUpload/ImageUploadTest';
import {dirNames, uploadFile} from '../api/setup/uploadFile';
import {addProducts} from '../api/setup/addProducts';
import {firestore} from '../api/setup/config';

const upload_VS = Yup.object().shape({
  // title:
  images: validationSchema.images,
  title: validationSchema.title,
  price: validationSchema.price,
  category: validationSchema.category,
  description: validationSchema.description,
});

const initialValues = {
  images: [],
  title: '',
  price: '',
  category: '',
  description: '',
};

const UploadScreen = () => {
  const handleSubmit = async values => {
    const imagePaths = values.images;
    let imageUrls = [];
    for (let i = 0; i < imagePaths.length; i++) {
      imageUrls.push(await uploadFile(dirNames.PRODUCTS_IMAGES, imagePaths[i]));
    }

    const newValues = {
      date: firestore.FieldValue.serverTimestamp(),
      ...values,
      images: imageUrls,
      rating: {
        count: parseInt(Math.random() * 500),
        rate: parseFloat((Math.random() * 5).toFixed(1)),
      },
    };
    addProducts(newValues);
  };

  return (
    <Screen>
      <View style={styles.container}>
        {/* <ImageUploadTest /> */}
        <AppText style={styles.header}>Upload product to Server</AppText>
        <AppForm
          initialValues={initialValues}
          validationSchema={upload_VS}
          enableReinitialize
          validateOnMount={true}
          onSubmit={handleSubmit}>
          <AppFormImagePicker name="images" />
          <View style={[styles.formContainer]}>
            <AppFormInput
              autoCapitalize="words"
              autoCorrect={false}
              name="title"
              // width="49.5%"
              placeholder="Title"
              textContentType="name"
            />
            <AppFormInput
              keyboardType="numeric"
              name="price"
              placeholder="Price"
            />
            <AppFormInput
              autoCapitalize="words"
              autoCorrect={false}
              name="category"
              // width="49.5%"
              placeholder="Category"
              textContentType="name"
            />
            <AppFormTextArea
              autoCapitalize="sentences"
              autoCorrect={false}
              name="description"
              placeholder="Description"
              textContentType="fullStreetAddress"
            />
          </View>
          <SubmitButton
            label="Proceed payment"
            containerStyle={styles.btnContainerStyle}
          />
        </AppForm>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    // backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    overflow: 'hidden',
  },
  header: {
    fontSize: fontSz(18),
    fontFamily: fonts.bold,
    marginBottom: 15,
  },
  formContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // backgroundColor: 'yellow',
  },
  btnContainerStyle: {
    width: '70%',
    marginVertical: 10,
    // alignSelf: 'center',
  },
});

export default UploadScreen;
