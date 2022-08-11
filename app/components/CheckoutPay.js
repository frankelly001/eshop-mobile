import React, {useRef, useContext} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import colors from '../config/colors';
import {fontSz} from '../config/responsiveSize';
import AppGradientBtn from './AppGradientBtn';
import AppText from './AppText';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import PaymentNotice from './Notice/PaymentNotice';
import DeliverySummary from './CheckOutSummay/DeliverySummary';
import BottomSheet from './BottomSheet';
import OrderSummary from './CheckOutSummay/OrderSummary';
import AuthContext from '../auth/AuthContext';
import {formatToCurrency} from '../utilities/formatToCurr';
import FlutterPayBtn from './FlutterPayBtn';
import fonts from '../config/fonts';

const CheckoutPay = ({deliveryInfo, onGoBack}) => {
  const deliverySummaryRef = useRef();
  const orderSummaryRef = useRef();
  const {total} = useContext(AuthContext);

  const onOpen = ref => {
    ref.current?.open();
  };
  return (
    <View style={styles.paymentContainer}>
      <View style={styles.detailsContainer}>
        <View style={styles.headerContainer}>
          <AppText style={styles.header}>CUSTOMER DELIVERY DETAILS</AppText>
          <TouchableOpacity onPress={() => onOpen(deliverySummaryRef)}>
            <AppText style={[styles.header, styles.headerPressable]}>
              SEE DETAILS <FontAwesomeIcon name="angle-right" />
            </AppText>
          </TouchableOpacity>
        </View>
        <View style={styles.deliverySummaryContainer}>
          <AppText>
            {`${deliveryInfo.firstname} ${deliveryInfo.lastname}`} -{' '}
            {deliveryInfo.email}
          </AppText>
          <AppText>
            {deliveryInfo.city},{' '}
            {`${deliveryInfo.state} - ${deliveryInfo.address}`}
          </AppText>
          <AppText>
            {deliveryInfo.phone}{' '}
            {deliveryInfo.additional_phone &&
              `/ ${deliveryInfo.additional_phone}`}
          </AppText>
          <TouchableOpacity onPress={onGoBack}>
            <AppText style={styles.changeBtn}>Change</AppText>
          </TouchableOpacity>
        </View>
        {/* <Modalize ref={deliverySummaryRef}>
          <View>
            <AppText>heyyy</AppText>
          </View>
        </Modalize> */}
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.headerContainer}>
          <AppText style={styles.header}>ORDER SUMMARY</AppText>
          <TouchableOpacity>
            <AppText
              style={[styles.header, styles.headerPressable]}
              onPress={() => onOpen(orderSummaryRef)}>
              SEE DETAILS <FontAwesomeIcon name="angle-right" />
            </AppText>
          </TouchableOpacity>
        </View>
        <View style={styles.totalSummaryContainer}>
          <AppText style={styles.totalLabel}>TOTAL</AppText>
          <AppText style={[styles.totalLabel, styles.price]}>
            {formatToCurrency(total)}
          </AppText>
        </View>
      </View>
      <FlutterPayBtn total={total} email={deliveryInfo.email} />
      {/* <AppGradientBtn
        label={`PAY NOW: ${formatToCurrency(total)}`}
        labelStyle={{fontWeight: '700'}}
      /> */}

      <PaymentNotice />

      <BottomSheet modalRef={deliverySummaryRef}>
        <DeliverySummary deliveryInfo={deliveryInfo} />
      </BottomSheet>

      <BottomSheet modalRef={orderSummaryRef}>
        <OrderSummary />
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  paymentContainer: {
    // padding: 20,
    backgroundColor: colors.grey_light,
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    padding: 15,
  },
  detailsContainer: {
    width: '100%',
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'white',
    padding: 5,
  },
  header: {
    fontSize: fontSz(10),
    fontFamily: fonts.bold,
    color: colors.grey_dark_4,
  },
  headerPressable: {
    color: colors.purple,
  },
  deliverySummaryContainer: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
  },
  changeBtn: {
    fontFamily: fonts.bold,
    alignSelf: 'flex-end',
    color: colors.purple,
  },
  totalSummaryContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  totalLabel: {
    fontFamily: fonts.bold,
  },
  price: {
    color: colors.grey_dark_3,
  },
});

export default CheckoutPay;
