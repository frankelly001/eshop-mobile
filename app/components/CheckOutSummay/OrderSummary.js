import React, {useContext} from 'react';
import {StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import AuthContext from '../../auth/AuthContext';
import {formatToCurrency} from '../../utilities/formatToCurr';
import AppText from '../AppText';
import ProductSummaryCard from './ProductSummaryCard';
import SummaryStyles from './SummaryStyles';

const {height} = Dimensions.get('screen');
const OrderSummary = props => {
  const {productsInCart, subTotal, delivery, total} = useContext(AuthContext);
  return (
    <View
      style={{
        width: '100%',
        height: height / 2,
        justifyContent: 'space-between',
      }}>
      <View style={[SummaryStyles.modalDetailsContainer, {flex: 1}]}>
        <View style={SummaryStyles.modalHeaderContainer}>
          <AppText style={SummaryStyles.modalHeader}>Cart Detail</AppText>
        </View>
        <View style={SummaryStyles.modalSubHeaderContainer}>
          <AppText style={SummaryStyles.modalSubHeader}>CART ITEMS</AppText>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {productsInCart.map(product => (
            <ProductSummaryCard key={product.id} product={product} />
          ))}
        </ScrollView>
      </View>
      <View style={[SummaryStyles.bottomContainer]}>
        <View style={SummaryStyles.modalSubHeaderContainer}>
          <AppText style={SummaryStyles.modalSubHeader}>
            PAYMENT SUMMARY
          </AppText>
        </View>
        <View style={SummaryStyles.modalDetail}>
          <AppText style={SummaryStyles.title}>Subtotal</AppText>
          <AppText style={SummaryStyles.title}>
            {formatToCurrency(subTotal)}
          </AppText>
        </View>
        <View style={SummaryStyles.modalDetail}>
          <AppText style={SummaryStyles.title}>Delivery</AppText>
          <AppText style={SummaryStyles.title}>
            {formatToCurrency(delivery)}
          </AppText>
        </View>
        <View style={SummaryStyles.modalDetail}>
          <AppText style={SummaryStyles.title}>Total</AppText>
          <AppText style={SummaryStyles.title}>
            {formatToCurrency(total)}
          </AppText>
        </View>
        <View style={SummaryStyles.modalBottomHeaderContainer}>
          <AppText style={SummaryStyles.modalHeader}>Total to Pay</AppText>
          <AppText style={SummaryStyles.modalHeader}>
            {formatToCurrency(total)}
          </AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default OrderSummary;
