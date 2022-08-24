import React, {useContext} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
// import {FlatList} from 'react-native-gesture-handler';
import AuthContext from '../auth/AuthContext';
import AppText from '../components/AppText';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontsizes, fontSz, hp, wp} from '../config/responsiveSize';
import {formatToCurrency} from '../utilities/formatToCurr';
import navigation from '../navigation/rootNavigation';
import routes from '../navigation/routes';

const OrderCard = ({product}) => {
  // console.log(product.images, 'images');
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(routes.ORDERDETAILS, product.id)}>
      <View style={styles.descriptionContainer}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() =>
            navigation.navigate(routes.PRODUCTDETAILS, product.id)
          }>
          <Image
            style={styles.image}
            resizeMode="stretch"
            source={{uri: product.images[0]}}
          />
        </TouchableOpacity>
        <View style={styles.details}>
          <AppText numberOfLines={2} style={styles.title}>
            {product.title}
          </AppText>
          <View style={styles.priceContainer}>
            <AppText style={styles.totalPrice}>
              {formatToCurrency(product.price * 5)}
            </AppText>
            <AppText style={styles.totalPriceSum}>
              ({formatToCurrency(product.price)} by 5 item)
            </AppText>
          </View>
          <View style={styles.status_and_date_Container}>
            <AppText style={styles.dateLabel}>15/ 2/ 2022</AppText>
            <View style={styles.statusContainer}>
              <AppText style={styles.statusLabel}>Pending</AppText>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const OrdersScreen = () => {
  const {products} = useContext(AuthContext);

  console.log(products.length, 'prod....');

  return (
    <FlatList
      data={products}
      style={{flex: 1}}
      // contentContainerStyle={styles.container}
      key={item => item.id}
      renderItem={({item}) => {
        return !item.empty && <OrderCard product={item} />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    backgroundColor: colors.white,
    // backgroundColor: 'red',
  },
  descriptionContainer: {
    flexDirection: 'row',
    flex: 10,
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  imageContainer: {
    width: wp(85),
    height: wp(85),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    flex: 1,
    padding: 5,
    justifyContent: 'space-between',
  },
  title: {
    // fontSize: fontSz(13),
    fontSize: fontSz(10),
    fontFamily: fonts.bold,
    textTransform: 'capitalize',
  },
  totalPrice: {
    // fontSize: fontSz(15),
    fontSize: fontSz(11.5),
    fontFamily: fonts.bold,
    color: colors.grey_dark_2,
    marginRight: 2,
  },
  totalPriceSum: {
    fontSize: fontSz(10),
    color: colors.grey_dark_4,
  },
  options: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.8,
  },
  status_and_date_Container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  statusContainer: {
    backgroundColor: colors.green,
    padding: 5,
    borderRadius: 5,
  },
  statusLabel: {
    fontSize: fontSz(8.5),
    fontFamily: fonts.semi_bold,
    color: colors.white,
  },
  dateLabel: {
    fontSize: fontSz(10),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  actionBtnContainer: {
    backgroundColor: colors.grey_light,
    position: 'absolute',
    borderRadius: 10,
    right: 0,
    bottom: 0,
    paddingVertical: 0,
    height: hp(100),
  },
});

export default OrdersScreen;
