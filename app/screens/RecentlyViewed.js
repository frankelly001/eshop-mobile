import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import AuthContext from '../auth/AuthContext';
import AppText from '../components/AppText';
import DeleteNotice from '../components/DeteteNotice';
import ProductCard from '../components/ProductCard';
import ProductsLoader from '../components/SkeletonLoader/ProductsLoader';
import colors from '../config/colors';
import fonts from '../config/fonts';
import routes from '../navigation/routes';
import {formatData} from '../utilities/formatData';

const RecentlyViewed = ({navigation}) => {
  const {recentlyViewed, loading, addToCart, clearRecentView} =
    useContext(AuthContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (loading.products) return <ProductsLoader />;

  return (
    <>
      {recentlyViewed.length ? (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={formatData(recentlyViewed, 2)}
            // style={{flex: 1}}
            // contentContainerStyle={styles.container}
            key={product => product.id.toString()}
            renderItem={({item}) => {
              if (item.empty)
                return (
                  <View style={{flex: 1, backgroundColor: 'transparent'}} />
                );
              return (
                <ProductCard
                  product={item}
                  // onPress={() => navigate(item.id)}
                  onPress={() =>
                    navigation.navigate(routes.PRODUCTDETAILS, item.id)
                  }
                  btnOnPress={() => addToCart(item.id)}
                  btnLabel="Buy Now"
                />
              );
            }}
          />
          <TouchableOpacity
            onPress={() => setShowDeleteModal(true)}
            style={{
              position: 'absolute',
              backgroundColor: colors.grey_dark,
              width: '100%',
              alignItems: 'center',
              padding: 15,
              bottom: 0,
            }}>
            <AppText style={{color: colors.white}}>Clear All</AppText>
          </TouchableOpacity>
          <DeleteNotice
            visible={showDeleteModal}
            onDelete={clearRecentView}
            onCancel={() => setShowDeleteModal(false)}
            noticeLabel="Are you sure you want to clear all recently viewed?"
          />
        </>
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
