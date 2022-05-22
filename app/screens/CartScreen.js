import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppGradientText from '../components/AppGradientText';
import AppText from '../components/AppText';
import CartItemCard from '../components/CartItemCard';
import colors from '../config/colors';

const CartScreen = props => {
  return (
    <View style={styles.container}>
      <View style={styles.feeSummaryContainer}>
        <View style={[styles.feeTitleContainer, styles.bottomSeperator]}>
          <AppText style={styles.feesummaryLabel}>Cart Summart</AppText>
        </View>
        <View style={styles.feeTitleContainer}>
          <AppText>SubTotal</AppText>
          <AppText style={styles.price}>₦236,075</AppText>
        </View>
        <View style={styles.feeTitleContainer}>
          <AppText>Delivery fee</AppText>
          <AppText style={styles.price}>₦5,000</AppText>
        </View>
        <View style={[styles.feeTitleContainer, styles.topSeperator]}>
          <AppText>Total</AppText>
          <AppText style={styles.price}>₦241,000</AppText>
        </View>
      </View>
      <CartItemCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  feeSummaryContainer: {
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: colors.grey_light,
  },
  feeTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
    // backgroundColor: 'yellow',
  },
  feesummaryLabel: {
    fontWeight: '700',
    // width: '100%',
  },
  bottomSeperator: {
    borderBottomWidth: 0.35,
    marginBottom: 5,
  },
  topSeperator: {
    borderTopWidth: 0.35,
    marginTop: 5,
  },
  price: {
    fontWeight: '700',
    color: colors.grey_dark_2,
  },
});

export default CartScreen;
