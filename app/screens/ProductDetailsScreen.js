import React, {useContext, useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import PlusMinusInputBtn from '../components/PlusMinusInputBtn';
import colors from '../config/colors';
import {formatToCurrency} from '../utilities/formatToCurr';
import {starRating} from '../utilities/starRating';
import LikeBtn from '../components/LikeBtn';
import Screen from '../components/Screen';
import AuthContext from '../auth/AuthContext';
import ProductCard from '../components/ProductCard';
import AppGradientBtn from '../components/AppGradientBtn';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {fontSz, hp, wp} from '../config/responsiveSize';
import fonts from '../config/fonts';
import ProductDetailsLoader from '../components/SkeletonLoader/ProductDetailsLoader';

const {width, height} = Dimensions.get('screen');

const ProductDetailsScreen = ({route}) => {
  const [productId, setProductId] = useState(route.params);
  const {products, ordered, addToCart, addToRecentView} =
    useContext(AuthContext);

  // const [product, setProduct] = useState({});
  // const [productCategogies, setProductCategogies] = useState([]);
  // const [quantityOrdered, setQuantityOrdered] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const product = products.find(prod => prod.id === productId);
  const productCategogies = products.filter(
    el =>
      el.category?.group?.type === product.category?.group?.type &&
      el.id !== product.id,
  );
  const quantityOrdered = ordered.find(el => el.id === product.id)?.quantity;
  useEffect(() => {
    addToRecentView(productId);
  }, [productId]);

  // console.log('lollllli');

  const scrollView = useRef();
  const [value, setValue] = useState(1);
  const scrollRef = useRef(null);

  // useEffect(() => {
  //   const productObj = products.find(product => product.id === productId);
  //   const productObjCategogies = products.filter(
  //     el =>
  //       el.category?.group?.type === productObj.category?.group?.type &&
  //       el.id !== productObj.id,
  //   );
  //   const qtyOrdered = ordered.find(el => el.id === productObj.id)?.quantity;

  //   setProduct(productObj);
  //   setProductCategogies(productObjCategogies);
  //   setQuantityOrdered(qtyOrdered);
  //   addToRecentView(productId);

  //   return function cleanUp() {};
  // }, [productId, ordered]);

  const checkRelatedItem = ({id}) => {
    setProductId(id);
    scrollView.current.scrollTo({x: 0, y: 0, animated: true});
  };

  const add = () => {
    setValue(value + 1);
  };

  const sub = () => {
    if (value > 1) setValue(value - 1);
  };

  const handleChange = value => {
    setValue(value);
  };

  const updateInput = () => {
    let val;
    const newVal = parseInt(value);
    if (!newVal || newVal < 1) val = 1;
    else val = newVal;
    setValue(val);
  };

  useEffect(() => {
    scrollRef?.current?.scrollTo({
      animated: true,
      y: 0,
      x: width * selectedIndex + 1,
    });
  }, [selectedIndex]);

  const uptSelectedIndex = event => {
    // width of the viewSize
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    // get current position of the scrollview
    const contentOffset = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.floor(contentOffset / viewSize);
    setSelectedIndex(currentIndex);
  };

  // console.log('Product Details Screen rendering ');
  if (!Object.entries(product).length) return <ProductDetailsLoader />;
  // if (1) return <ProductDetailsLoader />;
  return (
    <Screen scrollView={scrollView}>
      <View style={styles.container}>
        <View style={[styles.imageContainer, {backgroundColor: 'red'}]}>
          <ScrollView
            horizontal
            pagingEnabled
            onMomentumScrollEnd={uptSelectedIndex}
            // onScroll={uptSelectedIndex}
            showsHorizontalScrollIndicator={false}
            ref={scrollRef}>
            {product.images.map(img => (
              // <Image key={img} source={{uri: img}} style={styles.carouselImage} />
              <Image
                resizeMode="stretch"
                key={img}
                source={{uri: img}}
                style={styles.image}
              />
            ))}
          </ScrollView>
          <View style={styles.selectionContainer}>
            {product.images.map((img, i) => (
              <Pressable
                style={[
                  styles.selectImage,
                  {opacity: i !== selectedIndex ? 0.3 : 1},
                ]}
                key={img}
                onPress={() => setSelectedIndex(i)}>
                <Image
                  resizeMode="stretch"
                  key={img}
                  source={{uri: img}}
                  style={{width: '100%', height: '100%'}}
                />
              </Pressable>
            ))}
          </View>
        </View>
        <View style={{padding: 12}}>
          <AppText style={styles.title}>{product.title}</AppText>
          <AppText style={styles.price}>
            {formatToCurrency(product.price)}
          </AppText>
          <View style={styles.actionContainer}>
            <View style={styles.iconRatings}>
              {starRating(product.rating.rate).map(starType => (
                <FontAwesomeIcon
                  color={colors.yellow}
                  size={fontSz(20)}
                  key={starType.id}
                  name={starType.star}
                />
              ))}
            </View>
            <AppText style={styles.label}>
              ({product.rating.count} verified rating)
            </AppText>
          </View>
          <View style={styles.actionContainer}>
            <LikeBtn productId={product.id} />
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
              add={add}
              sub={sub}
              onBlur={updateInput}
              onChangeText={handleChange}
              value={value}
            />
            <AppGradientBtn
              label="add to Cart"
              labelStyle={styles.btnLabel}
              style={styles.addToCartBtn}
              onPress={() => {
                addToCart(product.id, value < 1 ? 1 : value);
                setValue(1);
              }}
            />
          </View>
          <View>
            <AppText style={styles.headerLabel}>Product Description</AppText>
            <AppText style={styles.description} numberOfLines={20}>
              {product.description}
            </AppText>
          </View>
        </View>
      </View>

      {productCategogies.length > 0 && (
        <View>
          <AppText style={[styles.headerLabel, styles.relatedHeader]}>
            Related Product
          </AppText>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={productCategogies}
            style={{marginBottom: 20}}
            contentContainerStyle={{padding: 5, paddingTop: 0}}
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
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  selectionContainer: {
    backgroundColor: colors.grey_dark_2_tranparent,
    position: 'absolute',
    height: hp(0.05 * height),
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    width: '100%',
    paddingVertical: 2,
    // opacity: 0.5,
  },
  selectImage: {
    width: wp(40),
    height: wp(40),
    borderRadius: 5,
    overflow: 'hidden',
    margin: 5,
    backgroundColor: '#fff',
  },
  container: {
    // padding: 10,
    // backgroundColor: 'red',
  },
  imageContainer: {
    width: width,
    height: 0.45 * height,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,

    // elevation: 2,
  },
  image: {
    width: width,
    height: 0.45 * height,
  },
  title: {
    // fontSize: fontSz(20),
    fontSize: fontSz(15),
    fontFamily: fonts.bold,
    textTransform: 'capitalize',
    // fontWeight: '700',
    // backgroundColor: 'yellow',
  },
  price: {
    // fontSize: fontSz(25),
    fontSize: fontSz(18),
    fontFamily: fonts.extra_bold,
    color: colors.grey_dark_2,
    marginVertical: 5,
  },

  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    // backgroundColor: 'red',
    marginBottom: 10,
  },

  iconRatings: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    // fontSize: fontSz(13),
    fontSize: fontSz(10.5),
    marginLeft: 5,
  },
  headerLabel: {
    // fontSize: fontSz(14),
    fontSize: fontSz(10.5),
    fontFamily: fonts.bold,
    marginVertical: 10,
  },
  orderedQty: {
    color: colors.grey_dark_2,
  },
  description: {
    // fontSize: fontSz(13.5),
    fontSize: fontSz(11),
    marginTop: -5,
  },
  quantityContainer: {
    // backgroundColor: 'orange',
    width: '75%',
    marginBottom: 5,
  },
  btnLabel: {
    textTransform: 'uppercase',
    fontSize: fontSz(13),
  },
  addToCartBtn: {
    marginTop: 10,
    paddingVertical: 10,
  },
  relatedHeader: {
    paddingHorizontal: 10,
  },
});

export default ProductDetailsScreen;
