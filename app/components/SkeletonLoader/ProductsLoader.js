import React from 'react';
import {Dimensions, ScrollView, StyleSheet} from 'react-native';
import ProductCardSampleLoader from './ProductCardSampleLoader';

const {width, height} = Dimensions.get('screen');
const productsSample = [
  {product: 'sample1'},
  {product: 'sample2'},
  {product: 'sample3'},
  {product: 'sample4'},
  {product: 'sample5'},
  {product: 'sample6'},
  {product: 'sample7'},
  {product: 'sample8'},
  {product: 'sample9'},
  {product: 'sample10'},
  {product: 'sample11'},
  {product: 'sample12'},
];
const ProductsLoader = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {productsSample.map(sample => (
        <ProductCardSampleLoader key={sample.product} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    paddingVertical: 3,
    justifyContent: 'space-between',
  },
});

export default ProductsLoader;
