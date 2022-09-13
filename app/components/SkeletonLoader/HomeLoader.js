import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Eshop_LoaderIcon from '../../assets/icons/eshop_loaderIcon.svg';
import {wp} from '../../config/responsiveSize';
import ColumnList from '../ColumnList';
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

const categoriesSample = [
  'category1',
  'category2',
  'category3',
  'category4',
  'category5',
  'category6',
  'category7',
  'category8',
  'category9',
  'category10',
  'category11',
];

const CatergorySampleCard = () => (
  <View style={styles.bgLoaderContainer}>
    <SkeletonPlaceholder>
      <View style={{width: wp(63), height: wp(63), borderRadius: 5}} />
    </SkeletonPlaceholder>
    <View style={styles.iconContainer}>
      <Eshop_LoaderIcon width={25} height={25} opacity={0.5} />
    </View>
  </View>
);

const HomeLoader = props => {
  const carouselHeight = height / 3.5;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 5}}>
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          // backgroundColor: colors.grey_light,
          paddingHorizontal: 3,
        }}>
        {categoriesSample.map(el => (
          <CatergorySampleCard key={el} />
        ))}
      </ScrollView>
      <SkeletonPlaceholder>
        <View
          style={{
            width: width,
            height: 40,
            marginBottom: 1.5,
          }}
        />
      </SkeletonPlaceholder>

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

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  bgLoaderContainer: {
    margin: 3,
  },
});

export default HomeLoader;

// {productsSample.map((sample, index) => {
//   const numColumns = 2;
//   if (index % numColumns !== 0) return null;

//   const items = [];

//   for (let i = index; i < index + numColumns; i++) {
//     if (i >= productsSample.length) {
//       console.log('break');
//       break;
//     }

//     items.push(
//       <ProductCardSampleLoader key={productsSample[i].product} />,
//     );
//   }
//   // console.log(items, 'key.....');
//   return (
//     <View key={sample.product} style={styles.container}>
//       {items}
//     </View>
//   );
//   // console.log('kkkkkkkk');
// })}
