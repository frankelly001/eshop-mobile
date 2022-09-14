import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import fonts from '../config/fonts';
import {fontSz} from '../config/responsiveSize';

const ProductDescriptionScreen = ({route}) => {
  return (
    <Screen contentContainerStyle={{padding: 10, paddingBottom: 30}}>
      <AppText style={styles.headerLabel}>Description</AppText>
      <AppText style={styles.description}>{route.params}</AppText>
    </Screen>
  );
};

const styles = StyleSheet.create({
  headerLabel: {
    fontSize: fontSz(10.5),
    fontFamily: fonts.bold,
    marginBottom: 10,
  },
});

export default ProductDescriptionScreen;
