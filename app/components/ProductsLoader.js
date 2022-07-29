import React from 'react';
import {Dimensions, FlatList, ScrollView, StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

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
];
const ProductsLoader = props => {
  const carouselHeight = height / 3.5;
  return (
    <ScrollView>
      <SkeletonPlaceholder>
        <View style={styles.container}>
          {productsSample.map(sample => (
            <View
              key={sample.product}
              style={{width: width / 2.17, height: 280, margin: 3}}
            />
          ))}
        </View>
      </SkeletonPlaceholder>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },
});

export default ProductsLoader;
