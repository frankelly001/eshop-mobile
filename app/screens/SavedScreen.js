import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import AuthContext from '../auth/AuthContext';
import AppText from '../components/AppText';
import DisplayMesssage from '../components/DisplayMesssage';
import ProductCard from '../components/ProductCard';
import ProductsLoader from '../components/SkeletonLoader/ProductsLoader';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {wp} from '../config/responsiveSize';
import routes from '../navigation/routes';
import {formatData} from '../utilities/formatData';

const SavedScreen = ({navigation}) => {
  const {savedItems, products, loading} = useContext(AuthContext);

  if (loading.products) return <ProductsLoader />;
  let savedProducts = products.filter(el => savedItems.includes(el.id));

  return (
    <>
      {savedProducts.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={formatData(savedProducts, 2)}
          // style={{flex: 1}}
          // contentContainerStyle={styles.container}
          key={product => product.id.toString()}
          renderItem={({item}) => {
            if (item.empty)
              return <View style={{flex: 1, backgroundColor: 'transparent'}} />;
            return (
              <ProductCard
                product={item}
                // onPress={() => navigate(item.id)}
                onPress={() =>
                  navigation.navigate(routes.PRODUCTDETAILS, item.id)
                }
                btnLabel="Buy Now"
              />
            );
          }}
        />
      ) : (
        <DisplayMesssage
          animatedIconSource={require('../assets/icons/animatedIcons/carton-empty.json')}
          animatedIconStyles={styles.animatedIcon}
          containerStyles={styles.activityContainer}>
          <AppText style={[styles.text, {color: colors.red_dark}]}>
            No Product found
          </AppText>
          <AppText style={styles.subText}>
            Try searching with short and simple keywords
          </AppText>
        </DisplayMesssage>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  animatedIcon: {
    width: wp(380),
    height: wp(380),
  },
  activityContainer: {
    backgroundColor: colors.white,
  },
  text: {
    fontFamily: fonts.semi_bold,
  },
  subText: {
    marginBottom: 100,
  },
});

export default SavedScreen;
