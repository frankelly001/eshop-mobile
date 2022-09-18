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

const upload_VS = Yup.object().shape({
  images: validationSchema.images,
  title: validationSchema.title,
  price: validationSchema.price,
  category: validationSchema.category,
  categoryGroupTitle: validationSchema.categoryGroupTitle,
  categoryGroupType: validationSchema.categoryGroupType,
  description: validationSchema.description(20, 5000),
});

const initialValues = {
  images: [],
  title: '',
  price: '',
  category: '',
  categoryGroupTitle: '',
  categoryGroupType: '',
  description: '',
};

const AddProductScreen = ({navigation}) => {
  const {categories} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleCategoryData = () => {
    return categories.map(el => {
      return {label: el.title, value: el.title};
    });
  };

  const handleCategoryGroupData = values => {
    const category = values['category'];
    return category
      ? categories
          .find(cat => cat.title === category)
          ?.groups.map(group => {
            return {label: group.title, value: group.title};
          })
      : [{label: 'Category not selected'}];
  };

  const handleCategoryGroupTypeData = values => {
    const category = values['category'];
    const categoryGroup = values['categoryGroupTitle'];

    return category
      ? categoryGroup
        ? categories
            .find(cat => cat.title === category)
            ?.groups.find(group => group.title === categoryGroup)
            ?.types.map(type => {
              return {label: type, value: type};
            })
        : [{label: 'Category group not selected'}]
      : [{label: 'Category not selected'}];
  };

  const handleSubmit = async (values, {resetForm}) => {
    setLoading(true);
    const imagePaths = values['images'];
    let imageUrls = [];
    for (let i = 0; i < imagePaths.length; i++) {
      imageUrls.push(
        await uploadFile(
          `${dirNames.PRODUCTS_IMAGES}/${values['category']}/${
            values['categoryGroupTitle']
          }/${
            values['categoryGroupType'] ? `${values['categoryGroupType']}/` : ''
          }${values['title'].toLowerCase().replace(/[^A-Z0-9']+/gi, '-')}`,
          imagePaths[i],
        ),
      );
    }

    const newValues = {
      date: firestore.FieldValue.serverTimestamp(),
      title: values['title'].toLowerCase(),
      price: +values['price'],
      images: imageUrls,
      category: {
        title: values['category'].toLowerCase(),
        group: {
          title: values['categoryGroupTitle'].toLowerCase(),
          type: values['categoryGroupType'].toLowerCase(),
        },
      },
      description: values['description'],
      rating: {
        count: parseInt(Math.random() * 500),
        rate: parseFloat((Math.random() * 5).toFixed(1)),
      },
    };
    // console.log(newValues);
    addProducts(newValues)
      .then(() => {
        // console.log('product added successfully', data);
        showToast(toast.types.SUCCESS, 'product added successfully');
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
        {/* <AppButton onPress={handleCategories} label="power" /> */}
        {/* <AppSelectInputOld /> */}
        <View style={styles.container}>
          {/* <ImageUploadTest /> */}

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
              <AppFormSelectInput
                name={'category'}
                onHandleData={handleCategoryData}
                placeholder="Select Category"
                searchPlaceholder="Search Category..."
                valueResetNames={['categoryGroupTitle', 'categoryGroupType']}
              />
              <AppFormSelectInput
                name={'categoryGroupTitle'}
                onHandleData={values => handleCategoryGroupData(values)}
                placeholder="Select Category Group"
                searchPlaceholder="Search Category Group..."
                valueResetNames={['categoryGroupType']}
              />
              <AppFormSelectInput
                name={'categoryGroupType'}
                onHandleData={values => handleCategoryGroupTypeData(values)}
                placeholder="Select Category Group Type"
                searchPlaceholder="Search Category Group Type..."
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

export default AddProductScreen;
