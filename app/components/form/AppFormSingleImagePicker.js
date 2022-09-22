import {useFormikContext} from 'formik';
import React from 'react';
import {Dimensions} from 'react-native';
import ImageInput from '../imageListUpload/ImageInput';
import ErrorMessage from './ErrorMessage';

const AppFormSingleImagePicker = ({
  name,
  cropHeight,
  cropWidth,
  iconSize,
  containerStyles,
}) => {
  const {errors, setFieldValue, values, touched} = useFormikContext();
  const imageUri = values[name] ? values[name][0] : null;

  const handleImageChange = uri => {
    uri ? setFieldValue(name, [uri]) : setFieldValue(name, []);
  };

  return (
    <>
      <ImageInput
        cropHeight={cropHeight}
        cropWidth={cropWidth}
        imageUri={imageUri}
        onChangeImage={handleImageChange}
        iconSize={iconSize}
        containerStyles={containerStyles}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormSingleImagePicker;
