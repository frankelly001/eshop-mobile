import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AuthContext from '../auth/AuthContext';
import AppText from '../components/AppText';
import AppForm from '../components/form/AppForm';
import AppFormInput from '../components/form/AppFormInput';
import AppFormSelectInput from '../components/form/AppFormSelectInput';
import SubmitButton from '../components/form/SubmitButton';
import validationSchema from '../components/form/validationSchema';
import Screen from '../components/Screen';
import fonts from '../config/fonts';
import {fontSz} from '../config/responsiveSize';
import * as Yup from 'yup';
import AppFormImagePicker from '../components/form/AppFormImagePicker';
import AppFormTextArea from '../components/form/AppFormTextArea';
import ActivityIndicator from '../components/ActivityIndicator';
import {dirNames, uploadFile} from '../api/setup/uploadFile';
import storage from '@react-native-firebase/storage';
import {
  productDataTypes,
  updateProductData,
} from '../api/setup/patchApi/updateProductData';
import {showToast} from '../components/AppToast/showToast';
import toast from '../components/AppToast/toast';
import {formatErrorMessage} from '../utilities/formatErrorMessage';
import {compareTwoArray} from '../utilities/compareTwoArray';
import {deleteFileFromStorage} from '../api/setup/deleteApi/deleteFileFromStorage';

const upload_VS = Yup.object().shape({
  images: validationSchema.images,
  title: validationSchema.title,
  price: validationSchema.price,
  category: validationSchema.category,
  categoryGroupTitle: validationSchema.categoryGroupTitle,
  categoryGroupType: validationSchema.categoryGroupType,
  description: validationSchema.description,
});

const ProductUpdateScreen = ({navigation, route}) => {
  const {categories, products} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const product = products.find(prod => prod.id === route.params);

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

  // console.log(route, 'kkkkk');

  const initialValues = {
    images: product?.images,
    title: product?.title,
    price: product?.price.toString(),
    category: product?.category?.title,
    categoryGroupTitle: product?.category?.group?.title,
    categoryGroupType: product?.category?.group?.type,
    description: product?.description,
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

  const handleSubmit = async values => {
    const imagePaths = values['images'];
    const imageUrls = [];

    const dataToUpdate = {
      ...(values['title'].toLowerCase() !=
        initialValues.title.toLowerCase() && {
        [productDataTypes.TITLE]: values['title'].toLowerCase(),
      }),
      ...(!compareTwoArray(values['images'], initialValues.images) && {
        [productDataTypes.IMAGES]: imageUrls,
      }),
      ...(values['price'].toLowerCase() !=
        initialValues.price.toLowerCase() && {
        [productDataTypes.PRICE]: +values['price'],
      }),
      ...(values['category'].toLowerCase() !=
        initialValues.category.toLowerCase() && {
        [productDataTypes.CATEGORYTITLE]: values['category'].toLowerCase(),
      }),
      ...(values['categoryGroupTitle'].toLowerCase() !=
        initialValues.categoryGroupTitle.toLowerCase() && {
        [productDataTypes.CATEGORYGROUPTITLE]:
          values['categoryGroupTitle'].toLowerCase(),
      }),
      ...(values['categoryGroupType'].toLowerCase() !=
        initialValues.categoryGroupType.toLowerCase() && {
        [productDataTypes.CATEGORYGROUPTYPE]:
          values['categoryGroupType'].toLowerCase(),
      }),
      ...(values['description'].toLowerCase() !=
        initialValues.description.toLowerCase() && {
        [productDataTypes.DESCRIPTION]: values['description'],
      }),
    };

    if (Object.entries(dataToUpdate).length) {
      setLoading(true);
      const length =
        product?.images.length > imagePaths.length
          ? product?.images.length
          : imagePaths.length;

      for (let i = 0; i < length; i++) {
        if (imagePaths[i] === product?.images[i]) {
          imageUrls.push(imagePaths[i]);
        } else {
          if (product?.images[i]) {
            await deleteFileFromStorage(product?.images[i], product);
          }

          if (imagePaths[i]) {
            imageUrls.push(
              await uploadFile(
                `${dirNames.PRODUCTS_IMAGES}/${values['category']}/${
                  values['categoryGroupTitle']
                }/${
                  values['categoryGroupType']
                    ? `${values['categoryGroupType']}/`
                    : ''
                }${values['title'].replace(/[^A-Z0-9']+/gi, '-')}`,
                imagePaths[i],
              ),
            );
          }
        }
      }

      updateProductData(product.id, dataToUpdate)
        .then(() => {
          setLoading(false);
          showToast(toast.types.SUCCESS, 'Product successfully updated');
          navigation.goBack();
        })
        .catch(error => {
          setLoading(false);
          showToast(toast.types.ERROR, formatErrorMessage(error));
        });
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} portal />

      <Screen>
        <View style={styles.container}>
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
                // style={{textTransform: 'capitalize'}}
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
              label="Proceed payment"
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

export default ProductUpdateScreen;
