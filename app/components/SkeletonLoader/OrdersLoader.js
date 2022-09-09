import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Eshop_LoaderIcon from '../../assets/icons/eshop_loaderIcon.svg';
import {hp, wp} from '../../config/responsiveSize';
import ColumnList from '../ColumnList';

const OrderCardSampleLoader = () => {
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
    flex: 1,
    height: wp(85),
    margin: 2,
    borderRadius: 5,
    overflow: 'hidden',
    margin: 10,
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

const ordersSample = [
  {order: 'sample1'},
  {order: 'sample2'},
  {order: 'sample3'},
  {order: 'sample4'},
  {order: 'sample5'},
  {order: 'sample6'},
  {order: 'sample7'},
  {order: 'sample8'},
];

const OrdersLoader = props => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ColumnList
        data={ordersSample}
        contentContainerStyle={{paddingHorizontal: 3}}
        keyExtractor={item => item.order}
        renderItem={item => <OrderCardSampleLoader key={item.order} />}
      />
    </ScrollView>
  );
};

export default OrdersLoader;
