import React from 'react';
import {useFormikContext} from 'formik';
import {StyleSheet} from 'react-native';
import ErrorMessage from './ErrorMessage';
import ImageInputList from '../imageListUpload/ImageInputList';

const AppFormImagePicker = ({name, maxNumofImage}) => {
  const {errors, setFieldValue, values, touched} = useFormikContext();
  const imageUris = values[name];

  const handleAdd = uri => {
    setFieldValue(name, [...imageUris, uri]);
  };

  const handleRemove = uri => {
    setFieldValue(
      name,
      imageUris.filter(imageUri => imageUri !== uri),
    );
  };

  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
        maxNumofImage={maxNumofImage}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AppFormImagePicker;
