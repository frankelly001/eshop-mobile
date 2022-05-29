import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import AppGradientBtn from '../components/AppGradientBtn';
import AppText from '../components/AppText';
import AppForm from '../components/form/AppForm';
import * as Yup from 'yup';
import {fontSz} from '../config/responsiveSize';
import AppFormInput from '../components/form/AppFormInput';
import CheckoutInfo from '../components/CheckoutInfo';
import colors from '../config/colors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const CheckoutScreen = props => {
  const [selectedTab, setSelectedTab] = useState('deliveryInfo');

  const deliveryInfoView = selectedTab === 'deliveryInfo';
  const paymentView = selectedTab === 'payment';

  console.log(deliveryInfoView, paymentView);

  const handleSubmit = () => {
    setSelectedTab('payment');
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <View style={styles.tabBtnContainer}>
          <AppGradientBtn
            label="Delivery information"
            style={styles.tabBtn}
            labelStyle={styles.tabBtnLabel}
            onPress={() => setSelectedTab('deliveryInfo')}
            inActive={!deliveryInfoView}
          />
        </View>
        <View style={styles.tabBtnContainer}>
          <AppGradientBtn
            label="Payment"
            style={styles.tabBtn}
            labelStyle={styles.tabBtnLabel}
            inActive={!paymentView}
          />
        </View>
      </View>
      {deliveryInfoView && <CheckoutInfo onSubmit={handleSubmit} />}
      {paymentView && (
        <View style={styles.paymentContainer}>
          <View style={styles.detailsContainer}>
            <View style={styles.headerContainer}>
              <AppText style={styles.header}>CUSTOMER DELIVERY DETAILS</AppText>
              <TouchableOpacity>
                <AppText style={[styles.header, styles.headerPressable]}>
                  SEE DETAILS <FontAwesomeIcon name="angle-right" />
                </AppText>
              </TouchableOpacity>
            </View>
            <View style={styles.deliverySummaryContainer}>
              <AppText>Okeke - Frankelly344@gmail.com</AppText>
              <AppText>Lagos - 56 sowemimo Street, Ojo Alaba</AppText>
              <AppText>080123578899</AppText>
              <TouchableOpacity>
                <AppText style={styles.changeBtn}>Change</AppText>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.headerContainer}>
              <AppText style={styles.header}>ORDER SUMMARY</AppText>
              <TouchableOpacity>
                <AppText style={[styles.header, styles.headerPressable]}>
                  SEE DETAILS <FontAwesomeIcon name="angle-right" />
                </AppText>
              </TouchableOpacity>
            </View>
            <View style={styles.totalSummaryContainer}>
              <AppText style={styles.totalLabel}>TOTAL</AppText>
              <AppText style={[styles.totalLabel, styles.price]}>
                ₦241,605
              </AppText>
            </View>
          </View>
          <AppGradientBtn
            label="PAY NOW: ₦241,605"
            labelStyle={{fontWeight: '700'}}
          />

          <AppText style={styles.notice}>
            By tapping "PAY NOW" I accept eShop´s{' '}
            <AppText style={[styles.notice, styles.noticeLink]}>
              Payment Terms & Conditions, General Terms and Conditions{' '}
            </AppText>
            , and{' '}
            <AppText style={[styles.notice, styles.noticeLink]}>
              Privacy and Cookie Notice
            </AppText>
          </AppText>

          <AppText style={styles.notice}>
            Please note: eShop will never ask you for your password, PIN, CVV or
            full card details over the phone or via email. Need help?{' '}
            <AppText style={[styles.notice, styles.noticeLink]}>
              Contact us on https://www.eShop.com.ng/contact/.
            </AppText>
          </AppText>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
  },
  tabBtnContainer: {
    flex: 1,
  },
  tabBtn: {
    borderRadius: 0,
  },
  tabBtnLabel: {
    fontSize: fontSz(13),
    fontWeight: '700',
  },
  btnContainerStyle: {
    width: '49.5%',
    marginVertical: 10,
    // alignSelf: 'center',
  },
  btnLabel: {
    fontSize: fontSz(15),
    fontWeight: '700',
  },
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
    fontSize: fontSz(13),
    fontWeight: '700',
    color: colors.grey_dark_4,
  },
  headerPressable: {
    fontWeight: '600',
    color: colors.purple,
  },
  deliverySummaryContainer: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
  },
  changeBtn: {
    fontWeight: '700',
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
    fontWeight: '700',
  },
  price: {
    color: colors.grey_dark_3,
  },
  notice: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: fontSz(14),
  },
  noticeLink: {
    color: colors.purple,
  },
});

export default CheckoutScreen;
