import React, {useContext, useState} from 'react';
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
import {addProducts} from '../api/setup/postApi/addProducts';
import {firestore} from '../api/setup/config';
import AuthContext from '../auth/AuthContext';
import AppFormSelectInput from '../components/form/AppFormSelectInput';
import ActivityIndicator from '../components/ActivityIndicator';
import {showToast} from '../components/AppToast/showToast';
import toast from '../components/AppToast/toast';
import {formatErrorMessage} from '../utilities/formatErrorMessage';
import {addFeed} from '../api/setup/postApi/addFeed';

const upload_VS = Yup.object().shape({
  images: validationSchema.images,
  title: validationSchema.title,
  description: validationSchema.description(25, 80),
});

const initialValues = {
  images: [],
  title: '',
  description: '',
};

const AddFeedScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, {resetForm}) => {
    setLoading(true);

    const feedDetails = {
      title: values['title'].toLowerCase(),
      image: await uploadFile(dirNames.FEED_IMAGES, values['images'][0]),
      description: values['description'],
    };

    await addFeed(`${Date.now()}`, feedDetails)
      .then(() => {
        showToast(toast.types.SUCCESS, 'feed added successfully');
        resetForm();
        setLoading(false);
        navigation.goBack();
      })
      .catch(error => {
        showToast(toast.types.SUCCESS, formatErrorMessage(error));
        setLoading(false);
      });
  };

  return (
    <>
      <ActivityIndicator visible={loading} />

      <Screen>
        <View style={styles.container}>
          <AppForm
            initialValues={initialValues}
            validationSchema={upload_VS}
            enableReinitialize
            validateOnMount={true}
            onSubmit={handleSubmit}>
            <AppFormImagePicker name="images" maxNumofImage={1} />
            <View style={[styles.formContainer]}>
              <AppFormInput
                autoCapitalize="words"
                autoCorrect={false}
                name="title"
                // width="49.5%"
                placeholder="Title"
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
              label="Add"
              containerStyle={styles.btnContainerStyle}
            />
          </AppForm>
        </View>
      </Screen>
    </>
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
    fontSize: fontSz(15),
    fontFamily: fonts.bold,
    marginBottom: 15,
  },
  formContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    // backgroundColor: 'yellow',
  },
  btnContainerStyle: {
    width: '70%',
    marginVertical: 10,
    // alignSelf: 'center',
  },
});

export default AddFeedScreen;
