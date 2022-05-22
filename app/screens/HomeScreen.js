import React, {useContext, useCallback, memo} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import AuthContext from '../auth/AuthContext';
import ProductCard from '../components/ProductCard';
import Screen from '../components/Screen';
import routes from '../navigation/routes';
import {formatData} from '../utilities/formatData';

const HomeScreen = ({navigation}) => {
  const {products} = useContext(AuthContext);

  // const navigate = useCallback(id => {
  //   navigation.navigate(routes.PRODUCTDETAILS, id);
  // }, []);

  console.log('Home Screen rendering');

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      numColumns={2}
      data={formatData(products, 2)}
      // style={{flex: 1}}
      // contentContainerStyle={styles.container}
      key={product => product.id.toString()}
      renderItem={({item}) => {
        if (item.empty)
          return <View style={{flex: 1, backgroundColor: 'red'}}></View>;
        return (
          <ProductCard
            product={item}
            // onPress={() => navigate(item.id)}
            onPress={() => navigation.navigate(routes.PRODUCTDETAILS, item.id)}
          />
        );
      }}
    />
  );
};

export default HomeScreen;
