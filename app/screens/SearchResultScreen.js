import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import AuthContext from '../auth/AuthContext';
import ProductCard from '../components/ProductCard';
import routes from '../navigation/routes';
import {formatData} from '../utilities/formatData';
import ActivityIndicator from '../components/ActivityIndicator';
import colors from '../config/colors';
import ProductsLoader from '../components/SkeletonLoader/ProductsLoader';
import collectionRefs from '../api/setup/collectionRefs';
import queryApi from '../api/setup/queryApi/queryApi';
import {useApi} from '../hooks/useApi';
import {showToast} from '../components/AppToast/showToast';
import AppText from '../components/AppText';
import DisplayMesssage from '../components/DisplayMesssage';
import {fontSz, wp} from '../config/responsiveSize';
import fonts from '../config/fonts';

function getUniqueListBy(arr, key) {
  return [...new Map(arr.map(item => [item[key], item])).values()];
}

const SearchResultScreen = ({navigation, route}) => {
  const [searchedProduct, setSearchedProduct] = useState([]);

  const {loading, request} = useApi(queryApi[route.params.searchType]);

  useEffect(() => {
    request(
      route.params.query,
      queryApi.searchFields[route.params?.searchField],
    ).then(data => {
      setSearchedProduct(data);
    });

    return () => {};

    // const filteredsearch = [
    //   ...products.filter(el =>
    //     el?.title?.toLowerCase().includes(route.params.query.toLowerCase()),
    //   ),
    //   ...products.filter(el =>
    //     el?.category?.title
    //       ?.toLowerCase()
    //       .includes(route.params.query.toLowerCase()),
    //   ),
    //   ...products.filter(el =>
    //     el?.category?.group?.title
    //       ?.toLowerCase()
    //       .includes(route.params.query.toLowerCase()),
    //   ),
    //   ...products.filter(el =>
    //     el?.category?.group?.type
    //       ?.toLowerCase()
    //       .includes(route.params.query.toLowerCase()),
    //   ),
    // ];
    // const searched = getUniqueListBy(filteredsearch, 'id');
    // setSearchedProduct(searched);
  }, [route.params?.query]);

  if (loading === null || loading) return <ProductsLoader />;

  return (
    <>
      {searchedProduct.length ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={formatData(searchedProduct, 2)}
          // style={{flex: 1}}
          contentContainerStyle={{padding: 2}}
          key={product => product.id.toString()}
          renderItem={({item}) => {
            if (item.empty)
              return <View style={{flex: 1, backgroundColor: 'transparent'}} />;
            return (
              <ProductCard
                product={item}
                btnOnPress={() => addToCart(item.id)}
                // onPress={() => navigate(item.id)}
                onPress={() =>
                  navigation.navigate(routes.PRODUCTDETAILS, item.id)
                }
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

export default SearchResultScreen;
