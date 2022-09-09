import React, {useContext, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AuthContext from '../auth/AuthContext';
import AppText from '../components/AppText';
import Seperator from '../components/Seperator';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontSz, hp, wp} from '../config/responsiveSize';
import {convertToReadableDateAndTime} from '../utilities/convertToReadableDate';
import {formatToCurrency} from '../utilities/formatToCurr';
import navigation from '../navigation/rootNavigation';
import AppButton from '../components/AppButton';
import routes from '../navigation/routes';
import AppGradientBtn from '../components/AppGradientBtn';
import GradientBackground from '../components/GradientBackground';
import {firestore} from '../api/setup/config';
import dayjs from 'dayjs';

const OrderCard = ({product, onPress}) => {
  // console.log(product.images, 'images');
  const convertToReadableTime = time => {
    var timestamp = new Date('2022-07-26T16:53:54.921Z').getTime();
    var formatedTime = new Date(timestamp);
    return formatedTime.toLocaleTimeString('fr');
  };
  const convertToTime = date => dayjs(date).format('DD MMM YY, h:mm a');
  // console.log(convertToTime(Date.now()), 'kkkkkk');

  return (
    <TouchableOpacity
      style={orderCardStyles.container}
      onPress={() => navigation.navigate(routes.PRODUCTDETAILS, product.id)}>
      <View style={orderCardStyles.descriptionContainer}>
        <View style={orderCardStyles.imageContainer}>
          <Image
            style={orderCardStyles.image}
            resizeMode="stretch"
            source={{uri: product.image}}
          />
        </View>
        <View style={orderCardStyles.details}>
          <AppText numberOfLines={2} style={orderCardStyles.title}>
            {product.title}
          </AppText>
          <AppText style={orderCardStyles.totalPrice}>
            {formatToCurrency(product.price)}
          </AppText>
          <AppText style={styles.orderId}>QTY: {product.quantity}</AppText>
        </View>
      </View>
      <View style={orderCardStyles.statusContainer}>
        {/* <AppButton label="Buy Again" bgStyle={{padding: 5}} onPress={onPress} /> */}
        <AppGradientBtn
          label="Buy Again"
          style={{padding: 8, borderRadius: 5}}
          labelStyle={{fontSize: fontSz(9)}}
          onPress={onPress}
        />
      </View>
    </TouchableOpacity>
  );
};

const OrderDetailsScreen = ({route}) => {
  const {orderedItems, addToCart} = useContext(AuthContext);

  const selectedOrder = orderedItems.find(
    el => el.transaction_info.transaction_id === route.params,
  );

  const paymentInfoData = [
    {
      title: 'Subtotal',
      value: selectedOrder.payment_summary.subTotal,
    },
    {
      title: 'Delivery',
      value: selectedOrder.payment_summary.delivery,
    },
    {
      title: 'Total',
      value: selectedOrder.payment_summary.total,
    },
  ];

  const deliveryInfoData = [
    {
      title: 'Firstname',
      value: selectedOrder.delivery_info.firstname,
    },
    {
      title: 'Lastname',
      value: selectedOrder.delivery_info.lastname,
    },
    {
      title: 'Email',
      value: selectedOrder.delivery_info.email,
    },
    {
      title: 'Phone',
      value: selectedOrder.delivery_info.phone,
    },
    {
      title: 'Additional Phone',
      value: selectedOrder.delivery_info?.additional_phone,
    },
    {
      title: 'State',
      value: selectedOrder.delivery_info.state,
    },
    {
      title: 'City',
      value: selectedOrder.delivery_info.city,
    },
    {
      title: 'Address',
      value: selectedOrder.delivery_info.address,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {/* <View style={styles.feeTitleContainer}>
          <AppText>Order ID</AppText>
          <AppText style={styles.labelValue}>
            #{selectedOrder.transaction_info.transaction_id}
          </AppText>
        </View> */}
        <GradientBackground
          style={[styles.feeTitleContainer, {paddingHorizontal: 10}]}>
          <AppText style={{color: colors.white, fontFamily: fonts.bold}}>
            Order ID
          </AppText>
          <AppText style={[styles.labelValue, {color: colors.white}]}>
            #{selectedOrder.transaction_info.transaction_id}
          </AppText>
        </GradientBackground>
        <View style={{paddingHorizontal: 10}}>
          <View style={styles.feeTitleContainer}>
            <AppText>Ordered on:</AppText>
            <AppText style={styles.labelValue}>
              {convertToReadableDateAndTime(selectedOrder.date_ordered)}
            </AppText>
          </View>
          <View style={styles.feeTitleContainer}>
            <AppText>Delivered on:</AppText>
            <AppText style={styles.labelValue}>
              {selectedOrder.date_delivered
                ? convertToReadableDateAndTime(selectedOrder.date_delivered)
                : 'Pending'}
            </AppText>
          </View>
          <View style={styles.feeTitleContainer}>
            <AppText>No of Items:</AppText>
            <AppText style={styles.labelValue}>
              {selectedOrder.ordered_products
                .map(el => el.quantity)
                .reduce((prev, cur) => prev + cur, 0)}
            </AppText>
          </View>

          <View style={[styles.feeTitleContainer]}>
            <AppText>Total:</AppText>
            <AppText style={styles.labelValue}>
              {formatToCurrency(selectedOrder.payment_summary.total)}
            </AppText>
          </View>
        </View>
      </View>

      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={[styles.scrollContainer, styles.topContainer]}>
        {selectedOrder.ordered_products.map(item => (
          <OrderCard
            key={item.id}
            product={item}
            onPress={() => addToCart(item.id)}
          />
        ))}
      </ScrollView>
      <View
        style={{
          maxHeight: '40%',
        }}>
        <ScrollView contentContainerStyle={{paddingBottom: 10}}>
          <View style={styles.modalSubHeaderContainer}>
            <AppText style={styles.modalSubHeader}>PAYMENT SUMMARY</AppText>
          </View>
          {paymentInfoData.map(el => (
            <View key={el.title} style={styles.modalDetail}>
              <AppText style={styles.title}>{el.title}</AppText>
              <AppText style={styles.title}>
                {formatToCurrency(el.value)}
              </AppText>
            </View>
          ))}

          <View style={styles.modalSubHeaderContainer}>
            <AppText style={styles.modalSubHeader}>
              DELIVERY INFORMATION
            </AppText>
          </View>
          {deliveryInfoData.map(el => {
            if (!el.value) return null;
            return (
              <View key={el.title} style={styles.modalDetail}>
                <AppText style={[styles.title, {marginRight: 50}]}>
                  {el.title}
                </AppText>
                <AppText style={styles.title}>{el.value}</AppText>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const orderCardStyles = StyleSheet.create({
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
    flex: 1,
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
    // backgroundColor: colors.green,
    // marginHorizontal: 10,
    position: 'absolute',
    bottom: 5,
    right: 5,
    zIndex: 1,
    width: '30%',
    // padding: 5,
    // width: 10,
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
});

const styles = StyleSheet.create({
  container: {
    width: '100%',

    flex: 1,
  },
  subContainer: {
    paddingHorizontal: 10,
  },
  feeTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 3,
    // paddingHorizontal: 10,
    // backgroundColor: 'yellow',
  },
  subContainer: {
    // paddingHorizontal: 10,
    backgroundColor: colors.grey_light,
  },
  labelValue: {
    fontFamily: fonts.bold,
    color: colors.grey_dark_2,
  },
  scrollContainer: {
    // paddingBottom: 20,
  },
  bottomContainer: {
    backgroundColor: colors.purple,
    justifyContent: 'flex-end',
    // height: '100%',
  },
  topContainer: {
    justifyContent: 'flex-start',
  },
  modalSubHeaderContainer: {
    backgroundColor: colors.grey_light,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  modalSubHeader: {
    fontSize: fontSz(10),
    fontFamily: fonts.bold,
    color: colors.grey_dark_2,
  },
  modalDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    // backgroundColor: colors.grey_light,

    // paddingHorizontal: 15,
    // backgroundColor: 'red',
  },
  modalHeader: {
    fontSize: fontSz(13),
    fontFamily: fonts.bold,
    color: colors.white,
  },
  title: {
    fontSize: fontSz(10),
    fontFamily: fonts.semi_bold,
    textTransform: 'capitalize',
  },
});

export default OrderDetailsScreen;

[
  {
    date: [Object],
    delivery_info: {
      additional_phone: '08063471236',
      address: 'Alandinma Owerri Imsu',
      city: 'Jega',
      email: 'frankelly3344@gmail.com',
      firstname: 'franklyn',
      lastname: 'okeke',
      phone: '08076507344',
      state: 'Kebbi',
    },
    orderStatus: 'pending',
    ordered_products: [[Object], [Object], [Object]],
    payment_summary: {delivery: 7000, subTotal: 73450, total: 80450},
    transaction_info: {
      status: 'successful',
      transaction_id: '3694682',
      tx_ref: 'flw_tx_ref_sOdVOHggVi',
    },
    userId: 'a7rXvVbeEgZBChus88nObYQ3azM2',
  },
];
