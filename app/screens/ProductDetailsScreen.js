import React, {useContext, useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
} from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import PlusMinusInputBtn from '../components/PlusMinusInputBtn';
import colors from '../config/colors';
import {formatToCurrency} from '../utilities/formatToCurr';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {starRating} from '../utilities/starRating';
import LikeBtn from '../components/LikeBtn';
import Screen from '../components/Screen';
import AuthContext from '../auth/AuthContext';
import ProductCard from '../components/ProductCard';
import AppGradientBtn from '../components/AppGradientBtn';

const dimenson = Dimensions.get('screen');

const ProductDetailsScreen = ({route}) => {
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState(route.params);
  const {products, dispatch, ordered} = useContext(AuthContext);

  const [product, setProduct] = useState({});
  const [productCategogies, setProductCategogies] = useState([]);
  const [quantityOrdered, setQuantityOrdered] = useState();

  const scrollView = useRef();
  const [value, setValue] = useState(1);
  const [resetVal, setResetVal] = useState(false);

  // const product = products.find(product => product.id === productId);

  useEffect(() => {
    const productObj = products.find(product => product.id === productId);
    const productObjCategogies = products.filter(
      el => el.category === productObj.category && el.id !== productObj.id,
    );
    const qtyOrdered = ordered.filter(el =>
      el.id === productObj.id ? el.quantity : null,
    )[0]?.quantity;

    // if (!productObj) navigate("*");
    setProduct(productObj);
    setProductCategogies(productObjCategogies);
    setQuantityOrdered(qtyOrdered);

    return function cleanUp() {};
  }, [productId, ordered]);

  const checkRelatedItem = ({id}) => {
    setProductId(id);
    scrollView.current.scrollTo({x: 0, y: 0, animated: true});
  };

  const getValue = val => {
    setValue(val);
  };

  console.log('Product Details Screen rendering ');
  if (Object.entries(product).length < 1) return null;
  return (
    <Screen scrollView={scrollView}>
      {!loading && (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="stretch"
              style={styles.image}
              source={{uri: product.image}}
            />
          </View>
          <View>
            <AppText style={styles.title}>{product.title}</AppText>
            <AppText style={styles.price}>
              {formatToCurrency(product.price)}
            </AppText>
            <View style={styles.actionContainer}>
              <View style={styles.iconRatings}>
                {starRating(product.rating.rate).map(starType => (
                  <FontAwesomeIcon
                    color={colors.yellow}
                    size={20}
                    key={starType.id}
                    icon={starType.star}
                  />
                ))}
              </View>
              <AppText style={styles.label}>
                ({product.rating.count} verified rating)
              </AppText>
            </View>
            <View style={styles.actionContainer}>
              <LikeBtn product={product} />
              <AppText style={styles.label}>Save for later</AppText>
            </View>
            <View style={styles.quantityContainer}>
              <AppText style={styles.headerLabel}>
                Quantity{' '}
                {quantityOrdered && (
                  <AppText style={styles.orderedQty}>
                    (ordered: {quantityOrdered})
                  </AppText>
                )}
              </AppText>
              <PlusMinusInputBtn
                resetVal={resetVal}
                onSetResetVal={setResetVal}
                getValue={getValue}
              />
              <AppGradientBtn
                label="add to Cart"
                labelStyle={styles.btnLabel}
                style={styles.addToCartBtn}
                onPress={() => {
                  dispatch({
                    type: 'addToCart',
                    id: product.id,
                    payload: value < 1 ? 1 : value,
                  });
                  setResetVal(true);
                }}
              />
            </View>
            <View>
              <AppText style={styles.headerLabel}>Product Description</AppText>
              <AppText style={styles.description}>
                {product.description}
              </AppText>
            </View>
          </View>
        </View>
      )}
      <View>
        <AppText style={[styles.headerLabel, styles.relatedHeader]}>
          Related Product
        </AppText>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={productCategogies}
          style={{marginBottom: 20}}
          key={product => product.id.toString()}
          renderItem={({item}) => {
            return (
              <ProductCard
                product={item}
                onPress={() => checkRelatedItem(item)}
                small
              />
            );
          }}
        />
        {/* <ScrollView horizontal>
          <View style={styles.related}>
            {productCategogies.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                small
                onPress={() => {
                  setProductId(product.id);
                  goToTop();
                  // scrollView.current.scrollTo({x: 0, y: 0, animated: true});
                }}
              />
            ))}
          </View>
        </ScrollView> */}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  imageContainer: {
    width: '100%',
    height: 0.45 * dimenson.height,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 23,
    fontWeight: '700',
    // backgroundColor: 'yellow',
  },
  price: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.grey_dark_2,
    marginVertical: 5,
  },

  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },

  iconRatings: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontSize: 15,
    marginLeft: 5,
  },
  headerLabel: {
    fontSize: 15,
    fontWeight: '700',
    marginVertical: 10,
  },
  orderedQty: {
    color: colors.grey_dark_2,
  },
  description: {
    fontSize: 16,
    marginTop: -5,
  },
  quantityContainer: {
    // backgroundColor: 'orange',
    width: '75%',
    marginBottom: 5,
  },
  btnLabel: {
    textTransform: 'uppercase',
  },
  addToCartBtn: {
    marginTop: 10,
  },
  related: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  relatedHeader: {
    paddingHorizontal: 10,
  },
});

export default ProductDetailsScreen;
