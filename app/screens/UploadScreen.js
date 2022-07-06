import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppForm from '../components/form/AppForm';

const UploadScreen = props => {
  return <AppForm initialValues={savedValues || initialValues}></AppForm>;
};

const styles = StyleSheet.create({
  container: {},
});

export default UploadScreen;
