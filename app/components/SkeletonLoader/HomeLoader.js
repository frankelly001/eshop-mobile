import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Eshop_LoaderIcon from '../../assets/icons/eshop_loaderIcon.svg';
import {hp} from '../../config/responsiveSize';
import ProductCardSampleLoader from './ProductCardSampleLoader';

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
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 60}}>
      <View>
        <SkeletonPlaceholder>
          <View
            style={{
              width: width,
              height: carouselHeight,
            }}
          />
        </SkeletonPlaceholder>
        <View style={styles.iconContainer}>
          <Eshop_LoaderIcon width={100} height={100} opacity={0.5} />
        </View>
      </View>
      <SkeletonPlaceholder>
        <View
          style={{
            width: width,
            height: 40,
            marginTop: 3,
          }}
        />
      </SkeletonPlaceholder>
      <View style={styles.container}>
        {productsSample.map(sample => (
          <ProductCardSampleLoader key={sample.product} />
        ))}
      </View>
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
  iconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default HomeLoader;
