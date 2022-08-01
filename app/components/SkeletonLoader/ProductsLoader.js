import React from 'react';
import {Dimensions, ScrollView, StyleSheet} from 'react-native';
import ColumnList from '../ColumnList';
import ProductCardSampleLoader from './ProductCardSampleLoader';

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
    <ScrollView showsVerticalScrollIndicator={false}>
      <ColumnList
        data={productsSample}
        contentContainerStyle={{paddingHorizontal: 3}}
        keyExtractor={item => item.product}
        numOfColumns={2}
        renderItem={item => <ProductCardSampleLoader key={item.product} />}
      />
    </ScrollView>
  );
};

export default ProductsLoader;
