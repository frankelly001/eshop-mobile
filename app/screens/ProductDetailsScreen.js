import React, {useContext, useState, useRef, useEffect, useMemo} from 'react';
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
import {navigationRef} from '../navigation/rootNavigation';
import routes from '../navigation/routes';
import DisplayMesssage from '../components/DisplayMesssage';

const {width, height} = Dimensions.get('screen');

const ProductDetailsScreen = ({navigation, route}) => {
  const [productId, setProductId] = useState(route.params);
  const {recentlyViewed, products, productsInCart, addToCart, addToRecentView} =
    useContext(AuthContext);

  // const [product, setProduct] = useState({});
  // const [productCategogies, setProductCategogies] = useState([]);
  // const [quantityOrdered, setQuantityOrdered] = useState();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const product = products.find(prod => prod.id === productId);
  const productCategogies = products.filter(
    el =>
      el.category?.group?.type === product?.category?.group?.type &&
      el.id !== product?.id,
  );
  const quantityInCart = productsInCart.find(
    el => el.id === product?.id,
  )?.quantity;

  useEffect(() => {
    addToRecentView(productId);
  }, [productId]);

  const scrollView = useRef();
  const [value, setValue] = useState(1);
  const scrollRef = useRef(null);

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

  if (product && !Object?.entries(product).length)
    return <ProductDetailsLoader />;

  return (
    <Screen scrollView={scrollView}>
      {product ? (
        <>
          <View style={styles.container}>
            <View style={[styles.imageContainer]}>
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
                      size={18}
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
                  {quantityInCart && (
                    <AppText style={styles.quantityInCart}>
                      ({quantityInCart})
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
                <AppText style={styles.headerLabel}>
                  Product Description
                </AppText>
                <AppText style={styles.description} numberOfLines={20}>
                  {product.description}
                </AppText>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  paddingHorizontal: 5,
                  marginTop: 5,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(
                      routes.PRODUCTDESCRIPTION,
                      product.description,
                    )
                  }>
                  <AppText
                    style={{
                      fontFamily: fonts.bold,
                      color: colors.purple,
                      fontSize: fontSz(10),
                    }}>
                    READ MORE
                  </AppText>
                </TouchableOpacity>
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
                      removeSaveBtn
                    />
                  );
                }}
              />
            </View>
          )}
        </>
      ) : (
        <DisplayMesssage
          animatedIconSource={require('../assets/icons/animatedIcons/ladypagenotfound.json')}
          animatedIconStyles={styles.animatedIcon}
          containerStyles={styles.activityContainer}>
          <AppText style={[styles.text, {color: colors.red_dark}]}>
            Product not found
          </AppText>
          <AppText style={styles.subText}>
            Try searching another Product
          </AppText>
        </DisplayMesssage>
      )}

      {recentlyViewed.length > 0 && (
        <View>
          <AppText style={[styles.headerLabel, styles.relatedHeader]}>
            Recently Viewed
          </AppText>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={recentlyViewed}
            style={{marginBottom: 20}}
            contentContainerStyle={{padding: 5, paddingTop: 0}}
            key={product => product.id.toString()}
            renderItem={({item}) => {
              return (
                <ProductCard
                  product={item}
                  onPress={() => checkRelatedItem(item)}
                  small
                  removeSaveBtn
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
    height: 0.06 * height,
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
    width: height * 0.05,
    height: height * 0.05,
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
  quantityInCart: {
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
    fontSize: fontSz(12),
  },
  addToCartBtn: {
    marginTop: 10,
    paddingVertical: 10,
  },
  relatedHeader: {
    paddingHorizontal: 10,
  },
  animatedIcon: {
    width: wp(380),
    height: wp(380),
  },
  activityContainer: {
    backgroundColor: colors.white,
    width: '100%',
    height: height * 0.67,
    position: undefined,
    zIndex: undefined,
  },
  text: {
    fontFamily: fonts.semi_bold,
  },
  subText: {
    marginBottom: 100,
  },
});

export default ProductDetailsScreen;
