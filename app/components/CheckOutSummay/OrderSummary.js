import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../AppText';
import SummaryStyles from './SummaryStyles';

const OrderSummary = props => {
  return (
    <>
      <View style={SummaryStyles.modalHeaderContainer}>
        <AppText style={SummaryStyles.modalHeader}>Cart Detail</AppText>
      </View>
      <View style={SummaryStyles.modalSubHeaderContainer}>
        <AppText style={SummaryStyles.modalSubHeader}>CART ITEMS</AppText>
      </View>
      <View style={SummaryStyles.modalDetailsContainer}>
        <View style={SummaryStyles.modalDetail}>
          <View style={SummaryStyles.LeftContainer}>
            <AppText style={SummaryStyles.title}>
              Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA)
              – Super Ultrawide Screen QLED
            </AppText>
            <AppText style={SummaryStyles.subTitle}>Price: ₦429,995</AppText>
            <AppText style={SummaryStyles.subTitle}>Quantity: 1</AppText>
          </View>
          <View style={SummaryStyles.RightContainer}>
            <AppText style={SummaryStyles.subTitle}>Total</AppText>
            <AppText style={SummaryStyles.itemTotal}>₦429,995</AppText>
          </View>
        </View>
        <View style={SummaryStyles.modalSubHeaderContainer}>
          <AppText style={SummaryStyles.modalSubHeader}>
            PAYMENT SUMMARY
          </AppText>
        </View>
        <View style={SummaryStyles.modalDetail}>
          <AppText style={SummaryStyles.title}>Subtotal</AppText>
          <AppText style={SummaryStyles.title}>₦1,112,375</AppText>
        </View>
        <View style={SummaryStyles.modalDetail}>
          <AppText style={SummaryStyles.title}>Delivery</AppText>
          <AppText style={SummaryStyles.title}>₦8,000</AppText>
        </View>
        <View style={SummaryStyles.modalDetail}>
          <AppText style={SummaryStyles.title}>Total</AppText>
          <AppText style={SummaryStyles.title}>₦1,120,375</AppText>
        </View>
      </View>
      <View style={SummaryStyles.modalBottomHeaderContainer}>
        <AppText style={SummaryStyles.modalHeader}>Cart Detail</AppText>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default OrderSummary;
