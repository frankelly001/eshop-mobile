import React, {useContext} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import AuthContext from '../auth/AuthContext';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontSz, wp} from '../config/responsiveSize';
import {formatToCurrency} from '../utilities/formatToCurr';
import AppButton from './AppButton';
import AppGradientBtn from './AppGradientBtn';
import AppText from './AppText';
import LikeBtn from './LikeBtn';

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

  // console.log(pro);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="stretch"
          style={styles.image}
          source={{
            uri: product.images[0],
          }}
        />
      </View>
      <View style={styles.description}>
        <AppText numberOfLines={1} style={styles.title}>
          {product.title}
        </AppText>
        <AppText style={styles.price}>
          {formatToCurrency(product.price)}
          {/* {product.price} */}
        </AppText>
        <AppGradientBtn
          label="add to cart"
          labelStyle={styles.btnLabel}
          onPress={() => dispatch({type: 'addToCart', id: product.id})}
        />
      </View>
      {!small && !medium && (
        <View style={{position: 'absolute', right: 5, top: 5}}>
          <LikeBtn product={product} size={20} />
        </View>
      )}
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
    fontSize: fontSz(13),
    // fontWeight: '700',
    fontFamily: fonts.bold,
  },

  price: {
    fontSize: fontSz(18),
    fontFamily: fonts.extra_bold,
    marginVertical: 3,
    color: colors.grey_dark_2,
  },

  btnLabel: {
    textTransform: 'uppercase',
    fontSize: fontSz(12),
    fontFamily: fonts.bold,
  },
});

const smallCardstyles = StyleSheet.create({
  container: {
    // width: 0.3 * dimenson.width,
    width: wp(120),
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
    // height: 0.3 * dimenson.width,
    height: wp(120),
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
    fontSize: fontSz(10),
    fontFamily: fonts.bold,
  },

  price: {
    fontFamily: fonts.extra_bold,
    marginVertical: 3,
    color: colors.grey_dark_2,
  },

  btnLabel: {
    textTransform: 'uppercase',
    fontSize: fontSz(10),
    fontFamily: fonts.bold,
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
    // fontSize: fontSz(12),
    fontSize: fontSz(10),
    fontFamily: fonts.bold,
  },

  price: {
    fontSize: fontSz(15),
    fontFamily: fonts.extra_bold,
    marginVertical: 3,
    color: colors.grey_dark_2,
  },

  btnLabel: {
    textTransform: 'uppercase',
    fontSize: fontSz(10),
    fontFamily: fonts.bold,
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
