import React, {useContext} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {deleteFileFromStorage} from '../api/setup/deleteApi/deleteFileFromStorage';
import {deleteProduct} from '../api/setup/deleteApi/deleteProduct';
import AuthContext from '../auth/AuthContext';
import ActivityIndicator from '../components/ActivityIndicator';
import {showToast} from '../components/AppToast/showToast';
import toast from '../components/AppToast/toast';
import Icon, {Icons} from '../components/Icons';
import ProductCard from '../components/ProductCard';
import ProductsLoader from '../components/SkeletonLoader/ProductsLoader';
import colors from '../config/colors';
import {wp} from '../config/responsiveSize';
import {useApi} from '../hooks/useApi';
import routes from '../navigation/routes';
import {formatData} from '../utilities/formatData';
import {formatErrorMessage} from '../utilities/formatErrorMessage';

const UpdateProductsScreen = ({navigation}) => {
  const {products, categories, loading, errors, addToCart} =
    useContext(AuthContext);
  const {loading: deleteLoading, request} = useApi(deleteProduct);

  if (loading.products) return <ProductsLoader />;

  const handleDelete = async product => {
    request(product.id)
      .then(async () => {
        for (let i = 0; i < product?.images.length; i++) {
          await deleteFileFromStorage(product?.images[i], product);
        }
        showToast(toast.types.SUCCESS, 'Product successfully deleted');
      })
      .catch(error => {
        showToast(toast.types.ERROR, formatErrorMessage(error));
      });
  };

  return (
    <>
      <ActivityIndicator visible={deleteLoading} portal />
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
              btnOnPress={() => handleDelete(item)}
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
