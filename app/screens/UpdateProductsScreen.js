import React, {useContext} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import AuthContext from '../auth/AuthContext';
import Icon, {Icons} from '../components/Icons';
import ProductCard from '../components/ProductCard';
import ProductsLoader from '../components/SkeletonLoader/ProductsLoader';
import colors from '../config/colors';
import {wp} from '../config/responsiveSize';
import routes from '../navigation/routes';
import {formatData} from '../utilities/formatData';

const UpdateProductsScreen = ({navigation}) => {
  const {products, categories, loading, errors, addToCart} =
    useContext(AuthContext);

  if (loading.products) return <ProductsLoader />;
  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={{paddingBottom: 100}}
        data={formatData(products, 2)}
        // style={{flex: 1}}
        // contentContainerStyle={styles.container}
        key={product => product.id.toString()}
        renderItem={({item}) => {
          if (item.empty)
            return <View style={{flex: 1, backgroundColor: 'transparent'}} />;
          return (
            <ProductCard
              product={item}
              removeSaveBtn
              btnLabel="Delete"
              // btnOnPress={() => addToCart(item.id)}
              onPress={() => navigation.navigate(routes.PRODUCTUPDATE, item.id)}
              // onPress={() =>
              //   navigation.navigate(routes.PRODUCTDETAILS, item.id)
              // }
            />
          );
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(routes.ADDPRODUCT)}
        style={{
          width: wp(45),
          height: wp(45),
          position: 'absolute',
          backgroundColor: colors.purple,
          borderRadius: wp(50 / 2),
          bottom: 20,
          right: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Icon type={Icons.AntDesign} name="plus" color={colors.white} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default UpdateProductsScreen;
