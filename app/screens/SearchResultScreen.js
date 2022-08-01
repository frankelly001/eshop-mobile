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
              />
            );
          }}
        />
      ) : (
        <ActivityIndicator
          animatedIconSource={require('../assets/icons/animatedIcons/ladypagenotfound.json')}
          visible
          animatedIconStyles={styles.animatedIcon}
          containerStyles={styles.activityContainer}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  animatedIcon: {
    marginBottom: 80,
  },
  activityContainer: {
    backgroundColor: colors.white,
    opacity: 1,
  },
});

export default SearchResultScreen;
