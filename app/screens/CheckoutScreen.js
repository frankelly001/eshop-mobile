import React, {useState, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import AppGradientBtn from '../components/AppGradientBtn';
import AppText from '../components/AppText';
import {fontSz} from '../config/responsiveSize';
import AppFormInput from '../components/form/AppFormInput';
import CheckoutInfo from '../components/CheckoutInfo';
import colors from '../config/colors';
import CheckoutPay from '../components/CheckoutPay';
import fonts from '../config/fonts';

const CheckoutScreen = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('deliveryInfo');
  const [savedValues, setSavedValues] = useState(null);

  const deliveryInfoView = selectedTab === 'deliveryInfo';
  const paymentView = selectedTab === 'payment';

  const handleSubmit = (values, {resetForm}) => {
    setSavedValues(values);
    setSelectedTab('payment');

    resetForm();
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
      {deliveryInfoView ? (
        <CheckoutInfo
          savedValues={savedValues}
          // setSavedValues={setSavedValues}
          onSubmit={handleSubmit}
        />
      ) : (
        <CheckoutPay
          deliveryInfo={savedValues}
          onGoBack={() => setSelectedTab('deliveryInfo')}
        />
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
    fontSize: fontSz(10),
  },
  btnContainerStyle: {
    width: '49.5%',
    marginVertical: 10,
    // alignSelf: 'center',
  },
});

export default CheckoutScreen;
