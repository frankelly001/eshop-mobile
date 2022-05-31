import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import colors from '../config/colors';
import {fontSz, hp, wp} from '../config/responsiveSize';
import AppText from './AppText';
import PlusMinusInputBtn from './PlusMinusInputBtn';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
const dimensions = Dimensions.get('window');
const scdimensions = Dimensions.get('screen');
import {formatToCurrency} from '../utilities/formatToCurr';
import ActionRemoveBtn from './ActionRemoveBtn';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const CartItemCard = ({product, renderRightActions, id, setId}) => {
  // const {dispatch} = useContext(AuthContext);
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <View style={styles.container}>
          <View style={styles.descriptionContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                resizeMode="stretch"
                source={{
                  uri: product.image,
                }}
              />
            </View>
            <View style={styles.details}>
              <AppText style={styles.title}>{product.title}</AppText>
              <View style={styles.priceContainer}>
                <AppText style={styles.totalPrice}>
                  {formatToCurrency(product.price)}
                </AppText>
                <AppText style={styles.totalPriceSum}>
                  ({formatToCurrency(product.price)} by {product.quantity} item)
                </AppText>
              </View>
              <View style={styles.input}>
                <PlusMinusInputBtn
                  small
                  value={product.quantity}
                  dispatchAdd={{type: 'addToCart', id: product.id}}
                  dispatchSub={{type: 'subFromCart', id: product.id}}
                  dispatchInput={{type: 'mutateCart', id: product.id}}
                />
              </View>
            </View>
          </View>
          {/* <TouchableOpacity
            style={styles.options}
            onPress={() => setId(product.id)}>
            <SimpleLineIcons size={fontSz(15)} name="options-vertical" />
          </TouchableOpacity>
          {product.id === id && (
            <ActionRemoveBtn
              contentContainerStyle={styles.actionBtnContainer}
            />
          )} */}
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

console.log(dimensions, scdimensions);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    backgroundColor: colors.white,
  },
  descriptionContainer: {
    flexDirection: 'row',
    flex: 10,
  },
  imageContainer: {
    width: wp(100),
    height: wp(100),
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
    fontSize: fontSz(13),
    fontWeight: '700',
  },
  totalPrice: {
    fontSize: fontSz(15),
    fontWeight: '700',
    color: colors.grey_dark_2,
  },
  totalPriceSum: {
    fontSize: fontSz(12),
    color: colors.grey_dark,
  },
  options: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0.8,
  },
  input: {
    width: '60%',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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

export default CartItemCard;
