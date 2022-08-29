import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import AuthContext from '../auth/AuthContext';
import AppText from '../components/AppText';
import ProductCard from '../components/ProductCard';
import ProductsLoader from '../components/SkeletonLoader/ProductsLoader';
import colors from '../config/colors';
import fonts from '../config/fonts';
import routes from '../navigation/routes';
import {formatData} from '../utilities/formatData';

const RecentlyViewed = ({navigation}) => {
  const {idRecentlyViewed, products, loading} = useContext(AuthContext);

  if (loading.products) return <ProductsLoader />;
  const recentlyViewed = products.filter(el =>
    idRecentlyViewed.includes(el.id),
  );

  return (
    <>
      {recentlyViewed.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={formatData(recentlyViewed, 2)}
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
        <View style={styles.container}>
          <AppText style={styles.text}>No item recently viewed</AppText>
          <AppText style={styles.subText}>
            You haven't viewed any item since you logged in.
          </AppText>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  text: {
    fontFamily: fonts.semi_bold,
  },
  subText: {
    marginBottom: 100,
    textAlign: 'center',
  },
});

export default RecentlyViewed;
