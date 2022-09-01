import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  BackHandler,
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
import {useFocusEffect} from '@react-navigation/native';
import {convertToReadableDate} from '../utilities/convertToReadableDate';

const OrderCard = ({product}) => {
  // console.log(product.images, 'images');

  const colorOrderStatus = {
    pending: colors.orange,
    delivered: colors.green,
    failed: colors.red_dark,
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(routes.ORDERDETAILS, product.trxId)}>
      <View style={styles.descriptionContainer}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() =>
            navigation.navigate(routes.PRODUCTDETAILS, product.id)
          }>
          <Image
            style={styles.image}
            resizeMode="stretch"
            source={{uri: product.image}}
          />
        </TouchableOpacity>
        <View style={styles.details}>
          <AppText numberOfLines={2} style={styles.title}>
            {product.title}
          </AppText>
          <View style={styles.priceContainer}>
            <AppText style={styles.totalPrice}>
              {formatToCurrency(product.price * product.quantity)}
            </AppText>
            <AppText style={styles.totalPriceSum}>
              ({formatToCurrency(product.price)} by {product.quantity} item)
            </AppText>
          </View>
          <AppText style={styles.orderId}>Order ID: #{product.trxId}</AppText>

          {/* <AppText style={styles.dateLabel}>
            {convertToReadableDate(product?.date_ordered)}
          </AppText> */}
          <View
            style={[
              styles.statusContainer,
              {backgroundColor: colorOrderStatus[product.orderStatus]},
            ]}>
            <AppText style={styles.statusLabel}>{product.orderStatus}</AppText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const OrdersScreen = ({navigation, route}) => {
  const {orderedItems} = useContext(AuthContext);
  const [ordered, setOrderd] = useState(null);

  useEffect(() => {
    const data = [];
    orderedItems.forEach(elOrder => {
      elOrder.ordered_products.forEach(item => {
        data.push({
          ...item,
          orderStatus: elOrder.orderStatus,
          date_ordered: elOrder.date_ordered,
          trxId: elOrder.transaction_info?.transaction_id,
          key: item.id + elOrder.transaction_info?.transaction_id,
        });
      });
    });
    setOrderd(data);
  }, [orderedItems]);

  useFocusEffect(
    useCallback(() => {
      const onBackHandler = () => {
        route?.params === routes.HOME
          ? navigation.navigate(routes.HOME)
          : navigation.goBack();
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackHandler);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackHandler);
    }, [route?.params]),
  );

  if (ordered === null) return null;
  return (
    <>
      {ordered.length ? (
        <FlatList
          data={ordered}
          style={{flex: 1}}
          // contentContainerStyle={styles.container}
          key={item => item.id}
          renderItem={({item}) => {
            return !item.empty && <OrderCard product={item} />;
          }}
        />
      ) : (
        <View style={styles.container2}>
          <AppText style={styles.text}>No item recently Ordered</AppText>
          <AppText style={styles.subText}>
            You haven't orderd any item. Checkout our categories and discover
            our best deals!
          </AppText>
        </View>
      )}
    </>
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
    paddingHorizontal: 5,
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
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  statusContainer: {
    padding: 5,
    borderRadius: 5,
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1,
    minWidth: '20%',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: fontSz(8.5),
    fontFamily: fonts.semi_bold,
    color: colors.white,
    textTransform: 'capitalize',
  },
  dateLabel: {
    fontSize: fontSz(10),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: 5,
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
  container2: {
    flex: 1,
    // backgroundColor: 'red',
    paddingHorizontal: 20,
    alignItems: 'center',
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

export default OrdersScreen;
