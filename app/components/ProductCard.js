import React, {useContext, memo} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import AuthContext from '../auth/AuthContext';
import colors from '../config/colors';
import {formatToCurrency} from '../utilities/formatToCurr';
import AppButton from './AppButton';
import AppGradientBtn from './AppGradientBtn';
import AppText from './AppText';

const dimenson = Dimensions.get('screen');

const ProductCard = ({product, onPress, small, medium}) => {
  const {dispatch} = useContext(AuthContext);
  // console.log(height);
  // const styles = small ? mediumCardstyles : bigCardstyles;
  const styles = (() => {
    if (small) return smallCardstyles;
    else if (medium) return mediumCardstyles;
    return bigCardstyles;
  })();

  // console.log('Product Card rendering');

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="stretch"
          style={styles.image}
          source={{
            uri: product.image,
          }}
        />
      </View>
      <View style={styles.description}>
        <AppText numberOfLines={1} style={styles.title}>
          {product.title}
        </AppText>
        <AppText style={styles.price}>
          {formatToCurrency(product.price)}
        </AppText>
        <AppGradientBtn
          label="add to cart"
          labelStyle={styles.btnLabel}
          onPress={() => dispatch({type: 'addToCart', id: product.id})}
        />
      </View>
    </TouchableOpacity>
  );
};

const bigCardstyles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    margin: 2,
    backgroundColor: colors.white,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  imageContainer: {
    overflow: 'hidden',
    width: '100%',
    height: dimenson.width / 2,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  description: {
    alignItems: 'center',
    padding: 5,
  },

  title: {
    fontSize: 15,
    fontWeight: '700',
  },

  price: {
    fontSize: 20,
    fontWeight: '900',
    marginVertical: 3,
    color: colors.grey_dark_2,
  },

  btnLabel: {
    textTransform: 'uppercase',
    fontSize: 12,
    fontWeight: '800',
  },
});

const smallCardstyles = StyleSheet.create({
  container: {
    width: 0.3 * dimenson.width,
    borderRadius: 20,
    // overflow: 'hidden',
    margin: 1,
    backgroundColor: colors.white,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  imageContainer: {
    overflow: 'hidden',
    width: '100%',
    height: 0.3 * dimenson.width,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  description: {
    alignItems: 'center',
    padding: 3,
  },

  title: {
    fontSize: 10,
    fontWeight: '700',
  },

  price: {
    fontSize: 15,
    fontWeight: '900',
    marginVertical: 3,
    color: colors.grey_dark_2,
  },

  btnLabel: {
    textTransform: 'uppercase',
    fontSize: 10,
    fontWeight: '800',
  },
});

const mediumCardstyles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    margin: 2,
    backgroundColor: colors.white,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  imageContainer: {
    overflow: 'hidden',
    width: '100%',
    height: 0.36 * dimenson.width,
  },

  image: {
    width: '100%',
    height: '100%',
  },

  description: {
    alignItems: 'center',
    padding: 3,
  },

  title: {
    fontSize: 12.5,
    fontWeight: '700',
  },

  price: {
    fontSize: 15,
    fontWeight: '900',
    marginVertical: 3,
    color: colors.grey_dark_2,
  },

  btnLabel: {
    textTransform: 'uppercase',
    fontSize: 10,
    fontWeight: '800',
  },
});

export default ProductCard;

// const smallCardstyles = StyleSheet.create({
//   container: {
//     width: 150,
//     borderRadius: 20,
//     // overflow: 'hidden',
//     margin: 2,
//     backgroundColor: colors.white,

//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.22,
//     shadowRadius: 2.22,

//     elevation: 3,
//   },

//   imageContainer: {
//     // borderRadius: 10,
//     overflow: 'hidden',
//     width: '100%',
//     height: 150,
//   },

//   image: {
//     width: '100%',
//     height: '100%',
//   },

//   description: {
//     alignItems: 'center',
//     padding: 3,
//   },

//   title: {
//     fontSize: 13,
//     fontWeight: '700',
//   },

//   price: {
//     fontSize: 15,
//     fontWeight: '900',
//     marginVertical: 3,
//     color: colors.grey_dark_2,
//   },

//   btnLabel: {
//     textTransform: 'uppercase',
//     fontSize: 10,
//     fontWeight: '800',
//   },
// });
