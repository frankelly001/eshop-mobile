import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Keyboard,
  Pressable,
  TouchableHighlight,
} from 'react-native';
import AuthContext from '../auth/AuthContext';
import ActionRemoveBtn from '../components/ActionRemoveBtn';
import AppButton from '../components/AppButton';
import AppGradientBtn from '../components/AppGradientBtn';
import AppGradientText from '../components/AppGradientText';
import AppText from '../components/AppText';
import CartItemCard from '../components/CartItemCard';
import GradientBackground from '../components/GradientBackground';
import Seperator from '../components/Seperator';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontSz, wp} from '../config/responsiveSize';
import routes from '../navigation/routes';
import {formatToCurrency} from '../utilities/formatToCurr';

const CartScreen = ({navigation}) => {
  const {ordered, subTotal, delivery, total} = useContext(AuthContext);
  const [id, setId] = useState(null);
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [keyboardStatus]);

  // console.log(keyboardStatus);

  // if (!ordered.length) return null;
  return (
    <View style={styles.container} onPress={() => setId(null)}>
      <View style={styles.feeSummaryContainer}>
        <GradientBackground style={styles.titleContainer}>
          <AppText style={styles.feesummaryLabel}>Cart Summary</AppText>
        </GradientBackground>
        <View style={styles.subContainer}>
          <View style={styles.feeTitleContainer}>
            <AppText>SubTotal</AppText>
            <AppText style={styles.price}>{formatToCurrency(subTotal)}</AppText>
          </View>
          <View style={styles.feeTitleContainer}>
            <AppText>Delivery fee</AppText>
            <AppText style={styles.price}>{formatToCurrency(delivery)}</AppText>
          </View>
          <Seperator />
          <View style={[styles.feeTitleContainer]}>
            <AppText>Total</AppText>
            <AppText style={styles.price}>{formatToCurrency(total)}</AppText>
          </View>
        </View>
      </View>
      <FlatList
        data={ordered}
        contentContainerStyle={{paddingBottom: keyboardStatus ? 120 : 70}}
        showsVerticalScrollIndicator={false}
        key={product => product.id.toString()}
        renderItem={({item}) => (
          <CartItemCard
            product={item}
            id={id}
            setId={setId}
            renderRightActions={() => (
              <ActionRemoveBtn
                contentContainerStyle={styles.renderRight}
                product={item}
              />
            )}
          />
        )}
      />
      {!keyboardStatus && (
        <View style={styles.checkout}>
          <AppButton
            label="Checkout"
            icon="cart-check"
            bgStyle={styles.checkoutbtn}
            onPress={() => {
              setId(null);
              navigation.navigate(routes.CHECKOUT);
            }}
          />
        </View>
      )}
    </View>
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
  feeTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
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
