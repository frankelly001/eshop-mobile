import React from 'react';
import {View} from 'react-native';
import {formatToCurrency} from '../../utilities/formatToCurr';
import AppText from '../AppText';
import SummaryStyles from './SummaryStyles';

const ProductSummaryCard = ({product}) => {
  return (
    <View style={SummaryStyles.modalDetail}>
      <View style={SummaryStyles.LeftContainer}>
        <AppText style={SummaryStyles.title}>{product.title}</AppText>
        <AppText style={SummaryStyles.subTitle}>
          Price: {formatToCurrency(product.price)}
        </AppText>
        <AppText style={SummaryStyles.subTitle}>
          Quantity: {product.quantity}
        </AppText>
      </View>
      <View style={SummaryStyles.RightContainer}>
        <AppText style={SummaryStyles.subTitle}>Total</AppText>
        <AppText style={SummaryStyles.itemTotal}>
          {formatToCurrency(product.price * product.quantity)}
        </AppText>
      </View>
    </View>
  );
};

export default ProductSummaryCard;
