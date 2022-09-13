import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useFormikContext} from 'formik';
import AppTextInput from '../AppTextInput';
import ErrorMessage from './ErrorMessage';
import colors from '../../config/colors';
import Icon, {Icons} from '../Icons';
import AnimatedFormPlaceholder from './AnimatedFormPlaceholder';

const AppFormInput = ({
  name,
  width = '100%',
  style,
  textContentType,
  placeholder,
  ...otherProps
}) => {
  const {setFieldTouched, setFieldValue, values, errors, touched} =
    useFormikContext();
  const [isFocus, setIsFocus] = useState(false);
  const [secureText, setSecureText] = useState(true);
  // console.log(touched);
  // console.log(errors);
  const isPasswordInput = textContentType === 'password';

  return (
    <View style={[styles.container, {width}]}>
      {/* {isFocus && <AppText style={styles.placeholder}>{placeholder}</AppText>} */}
      <AnimatedFormPlaceholder isFocus={isFocus} placeholder={placeholder} />
      <View>
        <AppTextInput
          style={[
            style,
            isFocus && {
              borderColor: colors.purple,
              borderWidth: 0.5,
            },
          ]}
          onFocus={() => setIsFocus(true)}
          onBlur={() => {
            setFieldTouched(name);
            setIsFocus(false);
          }}
          secureTextEntry={isPasswordInput ? secureText : false}
          textContentType={textContentType}
          onChangeText={text => setFieldValue(name, text)}
          value={values[name]}
          placeholder={!isFocus ? placeholder : ''}
          // width={width}
          {...otherProps}
        />
        {isPasswordInput && (
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setSecureText(!secureText)}>
            <Icon
              type={Icons.MaterialCommunityIcons}
              name={`eye${secureText ? '-off' : ''}`}
              size={20}
              style={styles.icon}
              color={colors.grey_dark_2}
            />
          </TouchableOpacity>
        )}
      </View>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    // backgroundColor: 'red',
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
    justifyContent: 'center',
    // backgroundColor: 'red',
    top: 0,
    bottom: 0,
  },
});

export default AppFormInput;
