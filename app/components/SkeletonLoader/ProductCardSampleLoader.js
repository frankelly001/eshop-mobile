import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Eshop_LoaderIcon from '../../assets/icons/eshop_loaderIcon.svg';
import {hp} from '../../config/responsiveSize';

const {width} = Dimensions.get('screen');
const ProductCardSampleLoader = () => {
  return (
    <View style={styles.bgLoaderContainer}>
      <SkeletonPlaceholder>
        <View style={{width: '100%', height: '100%'}} />
      </SkeletonPlaceholder>
      <View style={styles.iconContainer}>
        <Eshop_LoaderIcon width={50} height={50} opacity={0.5} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bgLoaderContainer: {
    // width: width / 2 - 2,
    flex: 1,
    height: hp(280),
    margin: 2,
    borderRadius: 10,
    overflow: 'hidden',
    // backgroundColor: 'red',
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
