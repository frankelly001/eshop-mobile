import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import {hp, wp} from '../utilities/Responsive';
import AppText from './AppText';
import PlusMinusInputBtn from './PlusMinusInputBtn';

const dimensions = Dimensions.get('screen');

const CartItemCard = props => {
  return (
    <View style={styles.container}>
      <View style={styles.descriptionContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
            }}
          />
        </View>
        <View style={styles.details}>
          <AppText style={styles.title}>
            Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) –
            Super Ultrawide Screen QLED
          </AppText>
          <AppText style={styles.totalPrice}>
            ₦429,995
            <AppText style={styles.totalPriceSum}>(₦429,995 by 1 item)</AppText>
          </AppText>
          <View style={styles.input}>
            <PlusMinusInputBtn small />
          </View>
        </View>
      </View>
      <View style={styles.options}>
        <FontAwesomeIcon
          style={{backgroundColor: 'blue'}}
          icon={['far', 'heart']}
        />
      </View>
    </View>
  );
};

// console.log(dimensions);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 0.28 * dimensions.width,
    // margin: 5,
  },
  descriptionContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    width: '90%',
    backgroundColor: 'red',
    // justifyContent: 'space-between',
  },
  imageContainer: {
    width: 0.25 * dimensions.width,
    height: 0.25 * dimensions.width,
    marginRight: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    backgroundColor: 'yellow',
    flex: 1,
    // height: '100%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15 * dimensions.fontScale,
    // fontSize: hp(2),
  },
  options: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '60%',
  },
});

export default CartItemCard;
