import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Eshop_LoaderIcon from '../../assets/icons/eshop_loaderIcon.svg';
import {hp} from '../../config/responsiveSize';

const {width} = Dimensions.get('screen');
const ProductCardSampleLoader = () => {
  return (
    <View>
      <SkeletonPlaceholder>
        <View style={styles.bgLoaderContainer} />
      </SkeletonPlaceholder>
      <View style={styles.iconContainer}>
        <Eshop_LoaderIcon width={50} height={50} opacity={0.5} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bgLoaderContainer: {
    width: width / 2.17,
    height: hp(280),
    margin: 3,
    borderRadius: 10,
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

export default ProductCardSampleLoader;
