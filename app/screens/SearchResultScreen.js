import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import AuthContext from '../auth/AuthContext';
import ProductCard from '../components/ProductCard';
import routes from '../navigation/routes';
import {formatData} from '../utilities/formatData';
import ActivityIndicator from '../components/ActivityIndicator';

const SearchResultScreen = ({navigation, route}) => {
  const {products} = useContext(AuthContext);
  const [searchedProduct, setSearchedProduct] = useState(null);

  useEffect(() => {
    const searched = products.filter(
      el =>
        el?.title.toLowerCase().includes(route.params.toLowerCase()) ||
        el?.category.toLowerCase().includes(route.params.toLowerCase()),
    );
    setSearchedProduct(searched);
  }, [route]);

  if (!searchedProduct) return null;
  return (
    <>
      {searchedProduct.length > 0 ? (
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
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default SearchResultScreen;
