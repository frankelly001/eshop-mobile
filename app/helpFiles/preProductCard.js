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
import {formatToCurrency} from '../utilities/formatToCurr';
import AppButton from './AppButton';
import AppText from './AppText';

const dimenson = Dimensions.get('screen');

const App = () => {
  const [products, setProducts] = useState({
    loading: true,
    data: [],
    error: null,
  });
  const [categories, setCategories] = useState({
    loading: true,
    data: [],
    error: null,
  });
  const [productsInCart, setProductsInCart] = useState([]);
  const [recentQueries, setRecentQueries] = useState([]);
  const [idRecentlyViewed, setIdRecentlyViewed] = useState([]);
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(false);

  useCheckNetworkStatus();

  const {cartItems, savedItems, actionTypes, dispatchAction} =
    useCartState(user);

  const initializeCartState = data => {
    dispatchAction({
      type: actionTypes.INITIALIZE_CART,
      data: data.cart_items,
    });
    dispatchAction({
      type: actionTypes.INITIALIZE_SAVE,
      data: data.saved_items,
    });
  };

  const clearCartState = () => {
    dispatchAction({type: actionTypes.CLEAR_CART});
    dispatchAction({type: actionTypes.CLEAR_SAVE});
  };

  const handleSave = id => {
    dispatchAction({type: actionTypes.ONSAVE, id});
  };

  const addToCart = (id, payload) => {
    dispatchAction({type: actionTypes.ADD_TO_CART, id, payload});
  };

  const subFromCart = id => {
    dispatchAction({type: actionTypes.SUB_FROM_CART, id});
  };

  const mutateCart = (id, payload) => {
    dispatchAction({type: actionTypes.MUTATE_CART, id, payload});
  };

  const removeFromCart = id => {
    dispatchAction({type: actionTypes.REMOVE_FROM_CART, id});
  };

  const addToRecentView = productId => {
    // onPress();
    const results = [
      productId,
      ...idRecentlyViewed.filter(el => el !== productId),
    ].slice(0, 10);
    storeUserData(authStorageKeys.RECENT_VIEWS, results);
    setIdRecentlyViewed(results);
  };

  const addToRecentQuery = newQuery => {
    const results = [
      newQuery,
      ...recentQueries.filter(el => el !== newQuery),
    ].slice(0, 10);
    setRecentQueries(results);
    storeUserData(authStorageKeys.RECENT_QUERIES, results);
  };

  const onAuthStateChanged = account => {
    // console.log(account, 'checking verification outside condition');
    // if (account && account.emailVerified) {
    //   // if (user && !user.verified) {
    //   console.log(account, 'checking verification inside condition');
    //   updateUserData(
    //     account.uid,
    //     userDataTypes.VERIFIED,
    //     account.emailVerified,
    //   ).then(() => {
    //     showToast(toast.types.SUCCESS, 'Your account is now verified');
    //   });
    //   // }
    // } else {
    //   console.log('Your account is not verified');
    // }

    setInitializing(false);
  };

  const onUserSubscriber = () => {
    const subscriber = collectionRefs.usersCollectionRef
      .doc(user?.id)
      .onSnapshot(documentSnapshot => {
        if (documentSnapshot._data) {
          const newUserInfo = {
            id: user.id,
            ...documentSnapshot._data,
          };
          storeUserData(authStorageKeys.USER_DATA, newUserInfo);
          // setUser(newUserData);
        }
      });
    return () => subscriber();
  };

  const getAllUserDataFromAsynStorage = () => {
    getUserData(authStorageKeys.USER_DATA)
      .then(user => {
        if (user) setUser(user);

        if (user && !user.verified)
          setTimeout(() => {
            showToast(
              toast.types.INFO,
              `Hello ${user.name.firstname}, Please go to Account and Verify your Account`,
            );
          }, 3000);
        // initializeCartState(data);
        // console.log(data, 'DATA................');
      })
      .catch(err => {
        setUser(null);
      });
    getUserData(authStorageKeys.RECENT_QUERIES)
      .then(data => {
        if (data) setRecentQueries(data);
      })
      .catch(() => {
        setRecentQueries([]);
      });
    getUserData(authStorageKeys.RECENT_VIEWS)
      .then(recentView => {
        if (recentView) setIdRecentlyViewed(recentView);
      })
      .catch(() => {
        setIdRecentlyViewed([]);
      });
  };

  const clearRecentQuery = () => {
    removeUserData(authStorageKeys.RECENT_QUERIES);
    setRecentQueries([]);
  };

  const clearRecentView = () => {
    removeUserData(authStorageKeys.RECENT_VIEWS);
    setIdRecentlyViewed([]);
  };

  // useEffect(() => {
  //   const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   getAllUserDataFromAsynStorage();
  //   return authSubscriber;
  // }, []);

  useEffect(() => {
    if (user) {
      initializeCartState(user);
      console.log('heyyyy, am initializing cart data');
    } else {
      clearCartState(user);
      console.log('heyyyy, am clearing cart data');
    }
    onUserSubscriber();
  }, [user?.id]);

  // useEffect(() => {
  //   const {isConnected, isInternetReachable} = netinfo;
  //   if (isConnected && isInternetReachable) {
  //     showToast(toast.types.SUCCESS, 'Connected');
  //   } else {
  //     showToast(toast.types.ERROR, "There's no Internet Connection");
  //   }
  // }, [netinfo]);

  const fetchProducts = () => {
    setProducts({...products, loading: true});

    getProducts()
      .then(snapshot => {
        const data = [];
        snapshot.forEach(el => {
          data.push({id: el.id, ...el.data()});
        });
        setTimeout(() => {
          setProducts({...products, data, loading: false});
        }, 2000);
      })
      .catch(error => {
        console.log(error, 'fetchProducts Error');
        setProducts({...products, error: error.message, loading: false});
        showToast(toast.types.ERROR, error.message);
      });
  };

  const retryFetch = () => {
    if (!products.data.length) fetchProducts();
    if (!categories.data.length) fetchCategories();
  };

  console.log('App.js rendering');

  const fetchCategories = () => {
    setCategories({...categories, loading: true});
    getCategories()
      .then(snapshot => {
        const data = [];
        snapshot.forEach(el => {
          // console.log(el.data());
          data.push(el.data());
        });
        setTimeout(() => {
          setCategories({...categories, data, loading: false});
        }, 2000);
      })
      .catch(error => {
        console.log(error, 'fetchCategories Error');
        setCategories({...categories, error: error.message, loading: false});
        showToast(toast.types.ERROR, error.message);
      });
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    SplashScreen.hide();

    const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged);
    getAllUserDataFromAsynStorage();
    return authSubscriber;
  }, []);

  // useEffect(()=> {

  // })

  useEffect(() => {
    const cartItemIDs = cartItems.map(el => el.productId);

    const filteredProductsInCart = products.data.filter(el =>
      cartItemIDs.includes(el.id),
    );
    const cartProducts = filteredProductsInCart.map(el => {
      return {
        ...el,
        quantity: cartItems.find(item => item.productId === el.id).quantity,
      };
    });
    setProductsInCart(cartProducts);
  }, [cartItems, products?.data]);

  const numOfCartItems = productsInCart
    .map(el => el.quantity)
    .reduce((prev, cur) => prev + cur, 0);
  const subTotal =
    Math.round(
      productsInCart
        .map(el => el.price * el.quantity)
        .reduce((prev, cur) => prev + cur, 0) * 10,
    ) / 10;
  const delivery =
    productsInCart.map(el => el.quantity).reduce((prev, cur) => prev + cur, 0) *
    1000;
  const total = subTotal + delivery;

  const toastConfig = {
    appToast: obj => {
      const {text2, props} = obj;
      return <AppToastView message={text2} type={props.toastType} />;
    },
  };

  // console.log(idRecentlyViewed, 'loppp');

  if (initializing) return null;
  return (
    <>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <Store>
        <NavigationContainer ref={navigationRef} theme={navigationTheme}>
          <Host>
            <MainStack />
          </Host>
        </NavigationContainer>
      </Store>

      <Toast config={toastConfig} topOffset={5} />
    </>
  );
  // return (
  //   <>
  //     <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
  //     <AuthContext.Provider
  //       value={{
  //         products: products.data,
  //         categories: categories.data,
  //         loading: {products: products.loading, categories: categories.loading},
  //         errors: {products: products.error, categories: categories.error},
  //         productsInCart,
  //         onLike: handleSave,
  //         numOfCartItems,
  //         subTotal,
  //         delivery,
  //         total,
  //         // setRecentQueries,
  //         user,
  //         setUser,
  //         addToRecentQuery,
  //         addToRecentView,
  //         recentQueries,
  //         idRecentlyViewed,
  //         clearRecentQuery,
  //         clearRecentView,
  //         addToCart,
  //         savedItems,
  //         subFromCart,
  //         mutateCart,
  //         removeFromCart,
  //         onAuthStateChanged,
  //         retryFetch,
  //       }}>
  //       <NavigationContainer ref={navigationRef} theme={navigationTheme}>
  //         <Host>
  //           <MainStack />
  //         </Host>
  //       </NavigationContainer>
  //     </AuthContext.Provider>
  //     <Toast config={toastConfig} topOffset={5} />
  //   </>
  // );
};

const ProductCard = ({product, onPress, small}) => {
  const {dispatch} = useContext(AuthContext);
  // console.log(height);
  const styles = small ? mediumCardstyles : bigCardstyles;

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
        <AppButton
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
    // width: 0.49 * dimenson.width,
    flex: 1,
    // width: '49%',
    borderRadius: 20,
    // overflow: 'hidden',
    // marginVertical: 3,
    margin: 5,
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
    // borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
    // height: 0.25 * dimenson.height,
    // height: 0.49 * dimenson.width,
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
    fontSize: 16,
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
    width: 120,
    borderRadius: 20,
    // overflow: 'hidden',
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
    // borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    height: 120,
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
    fontSize: 13,
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
    width: 0.36 * dimenson.width,
    // flex: 1,
    borderRadius: 20,
    // overflow: 'hidden',
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
    // borderRadius: 10,
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
    fontSize: 13,
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
