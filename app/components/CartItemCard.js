import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import colors from '../config/colors';
import {fontSz, hp, wp} from '../config/responsiveSize';
import AppText from './AppText';
import PlusMinusInputBtn from './PlusMinusInputBtn';
import {formatToCurrency} from '../utilities/formatToCurr';
import Swipeable from 'react-native-gesture-handler/Swipeable';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
import navigation from '../navigation/rootNavigation';
import routes from '../navigation/routes';
import fonts from '../config/fonts';
import AuthContext from '../auth/AuthContext';

const CartItemCard = ({product, renderRightActions}) => {
  const [value, setValue] = useState(product.quantity);
  const {addToCart, subFromCart, mutateCart} = useContext(AuthContext);

  const updateInput = () => {
    let payload;
    const newVal = parseInt(value);
    if (newVal < 1) payload = 1;
    else if (!newVal) {
      payload = product.quantity;
      setValue(product.quantity);
    } else payload = newVal;
    mutateCart(product.id, payload);
  };

  const add = () => {
    addToCart(product.id);
  };

  const sub = () => {
    subFromCart(product.id);
  };

  const handleChange = value => {
    setValue(value);
  };

  useEffect(() => {
    setValue(product.quantity);
  }, [product.quantity]);

  return (
    // <GestureHandlerRootView>
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.container}>
        <View style={styles.descriptionContainer}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() =>
              navigation.navigate(routes.PRODUCTDETAILS, product.id)
            }>
            <Image
              style={styles.image}
              resizeMode="stretch"
              source={{
                uri: product.images[0],
              }}
            />
          </TouchableOpacity>
          <View style={styles.details}>
            <AppText style={styles.title}>{product.title}</AppText>
            <View style={styles.priceContainer}>
              <AppText style={styles.totalPrice}>
                {formatToCurrency(product.price * product.quantity)}
              </AppText>
              <AppText style={styles.totalPriceSum}>
                ({formatToCurrency(product.price)} by {product.quantity} item)
              </AppText>
            </View>
            <View style={styles.input}>
              <PlusMinusInputBtn
                small
                value={value}
                onBlur={updateInput}
                onChangeText={text => handleChange(text)}
                add={add}
                sub={sub}
                // dispatchAdd={{type: 'addToCart', id: product.id}}
                // dispatchSub={{type: 'subFromCart', id: product.id}}
                // dispatchInput={{type: 'mutateCart', id: product.id}}
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
    // </GestureHandlerRootView>
  );
};

// console.log(dimensions, scdimensions);

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
    // fontSize: fontSz(13),
    fontSize: fontSz(10),
    fontFamily: fonts.bold,
    textTransform: 'capitalize',
  },
  totalPrice: {
    // fontSize: fontSz(15),
    fontSize: fontSz(11),
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
