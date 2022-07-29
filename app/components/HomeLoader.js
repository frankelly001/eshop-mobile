import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ProductsLoader from './ProductsLoader';

const {width, height} = Dimensions.get('screen');
const productsSample = [
  {product: 'sample1'},
  {product: 'sample2'},
  {product: 'sample3'},
  {product: 'sample4'},
  {product: 'sample5'},
  {product: 'sample6'},
];
const HomeLoader = props => {
  const carouselHeight = height / 3.5;
  return (
    <ScrollView contentContainerStyle={{paddingBottom: 60}}>
      <SkeletonPlaceholder>
        <View style={{width: width, height: carouselHeight}} />
        <View
          style={{
            width: width,
            height: 40,
            marginTop: 3,
          }}
        />
        <View style={styles.container}>
          {productsSample.map(sample => (
            <View
              key={sample.product}
              style={{
                width: width / 2.17,
                height: 280,
                margin: 3,
                borderRadius: 10,
              }}
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
    paddingHorizontal: 10,
    // paddingVertical: 3,
    justifyContent: 'space-between',
  },
});

export default HomeLoader;
