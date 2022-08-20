import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import AuthContext from '../auth/AuthContext';
import ActionRemoveBtn from '../components/ActionRemoveBtn';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import CartItemCard from '../components/CartItemCard';
import DisplayMesssage from '../components/DisplayMesssage';
import GradientBackground from '../components/GradientBackground';
import Seperator from '../components/Seperator';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {wp} from '../config/responsiveSize';
import routes from '../navigation/routes';
import {formatToCurrency} from '../utilities/formatToCurr';

const CartScreen = ({navigation}) => {
  const {ordered, subTotal, delivery, total} = useContext(AuthContext);
  // const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  // useEffect(() => {
  //   const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
  //     setKeyboardStatus(true);
  //   });
  //   const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
  //     setKeyboardStatus(false);
  //   });

  //   return () => {
  //     showSubscription.remove();
  //     hideSubscription.remove();
  //   };
  // }, [keyboardStatus]);

  // console.log(keyboardStatus);

  // if (!ordered.length) return null;
  return (
    <>
      {ordered.length ? (
        <View style={styles.container}>
          <View style={styles.feeSummaryContainer}>
            <GradientBackground style={styles.titleContainer}>
              <AppText style={styles.feesummaryLabel}>Cart Summary</AppText>
            </GradientBackground>
            <View style={styles.subContainer}>
              <View style={styles.feeTitleContainer}>
                <AppText>SubTotal</AppText>
                <AppText style={styles.price}>
                  {formatToCurrency(subTotal)}
                </AppText>
              </View>
              <View style={styles.feeTitleContainer}>
                <AppText>Delivery fee</AppText>
                <AppText style={styles.price}>
                  {formatToCurrency(delivery)}
                </AppText>
              </View>
              <Seperator />
              <View style={[styles.feeTitleContainer]}>
                <AppText>Total</AppText>
                <AppText style={styles.price}>
                  {formatToCurrency(total)}
                </AppText>
              </View>
            </View>
          </View>
          <KeyboardAvoidingView
            behavior="height"
            style={{flex: 1, backgroundColor: 'red'}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 100}}>
              {ordered.map(item => (
                <CartItemCard
                  key={item.id}
                  product={item}
                  renderRightActions={() => (
                    <ActionRemoveBtn
                      contentContainerStyle={styles.renderRight}
                      product={item}
                    />
                  )}
                />
              ))}
            </ScrollView>

            <View style={styles.checkout}>
              <AppButton
                label="Checkout"
                icon="cart-check"
                bgStyle={styles.checkoutbtn}
                onPress={() => {
                  navigation.navigate(routes.CHECKOUT);
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      ) : (
        <DisplayMesssage
          animatedIconSource={require('../assets/icons/animatedIcons/cart-empty.json')}
          animatedIconStyles={styles.animatedIcon}
          containerStyles={styles.activityContainer}>
          <AppText style={styles.text}>Your Cart is empty!</AppText>
          <AppText style={styles.subText}>
            Browse our categories and discover our best deals!
          </AppText>
        </DisplayMesssage>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feeSummaryContainer: {
    width: '100%',
    // paddingHorizontal: 10,
    backgroundColor: colors.grey_light,
  },
  animatedIcon: {
    width: wp(300),
    height: wp(300),
    // marginTop: -100,
  },
  text: {
    color: colors.grey_dark_3,
    fontFamily: fonts.extra_bold,
  },
  subText: {
    marginBottom: 120,
  },
  feeTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 3,
    // paddingHorizontal: 10,
    // backgroundColor: 'yellow',
  },
  titleContainer: {
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  feesummaryLabel: {
    fontFamily: fonts.bold,
    // width: '100%',
    color: colors.white,
  },
  subContainer: {
    paddingHorizontal: 10,
  },
  price: {
    fontFamily: fonts.bold,
    color: colors.grey_dark_2,
  },
  checkout: {
    position: 'absolute',
    width: '80%',
    alignSelf: 'center',
    bottom: 20,
  },
  checkoutbtn: {
    backgroundColor: colors.green,
  },
  renderRight: {
    justifyContent: 'space-between',
    backgroundColor: colors.red_light,
    // backgroundColor: 'red',
    // width: wp(100),
    // padding: 0,
    // margin: 5,
  },
});

export default CartScreen;
