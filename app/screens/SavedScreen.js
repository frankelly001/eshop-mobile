import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import AuthContext from '../auth/AuthContext';
import AppButton from '../components/AppButton';
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
  const {savedProducts, loading, addToCart} = useContext(AuthContext);

  if (loading.products) return <ProductsLoader />;

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
                btnOnPress={() => addToCart(product.id)}
                btnLabel="Buy Now"
              />
            );
          }}
        />
      ) : (
        <View style={styles.container}>
          <AppText style={styles.text}>No Save</AppText>
          <AppText style={styles.subText}>
            You don't have any Saved Items.
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
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
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
    textAlign: 'center',
  },
});

export default SavedScreen;
