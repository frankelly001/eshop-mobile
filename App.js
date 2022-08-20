import React, {useState, useEffect} from 'react';
import AuthContext from './app/auth/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import navigationTheme from './app/navigation/navigationTheme';
import HomeStack from './app/navigation/HomeStack';
import {navigationRef} from './app/navigation/rootNavigation';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';
import SplashScreen from 'react-native-splash-screen';
import {auth} from './app/api/setup/config';
import {
  authStorageKeys,
  getUserData,
  removeUserData,
  storeUserData,
} from './app/api/storage/authStorage';
import {getCategories} from './app/api/setup/getApi/getCategories';
import {getProducts} from './app/api/setup/getApi/getProducts';
import collectionRefs from './app/api/setup/collectionRefs';
import {useCartState} from './app/hooks/useCartState';
import {StatusBar} from 'react-native';
import colors from './app/config/colors';
import AppToastView from './app/components/AppToast/AppToastView';
import Toast from 'react-native-toast-message';
import {showToast} from './app/components/AppToast/showToast';
import toast from './app/components/AppToast/toast';
import {useCheckNetworkStatus} from './app/hooks/useCheckNetworkStatus';

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
  const [ordered, setOrdered] = useState([]);
  const [recentQueries, setRecentQueries] = useState([]);
  const [idRecentlyViewed, setIdRecentlyViewed] = useState([]);
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(false);

  useCheckNetworkStatus();

  const {orderedItems, savedItems, actionTypes, dispatchAction} =
    useCartState(user);

  const initializeCartState = data => {
    dispatchAction({
      type: actionTypes.INITIALIZE_ORDER,
      data: data.odered_items,
    });
    dispatchAction({
      type: actionTypes.INITIALIZE_SAVE,
      data: data.saved_items,
    });
  };

  const clearCartState = () => {
    dispatchAction({type: actionTypes.CLEAR_ORDER});
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
    const orderedID = orderedItems.map(el => el.productId);

    const filteredProduts = products.data.filter(el =>
      orderedID.includes(el.id),
    );
    const orderedOroducts = filteredProduts.map(el => {
      return {
        ...el,
        quantity: orderedItems.find(ordered => ordered.productId === el.id)
          .quantity,
      };
    });
    setOrdered(orderedOroducts);
  }, [orderedItems, products?.data]);

  const orderedNum = ordered
    .map(el => el.quantity)
    .reduce((prev, cur) => prev + cur, 0);
  const subTotal =
    Math.round(
      ordered
        .map(el => el.price * el.quantity)
        .reduce((prev, cur) => prev + cur, 0) * 10,
    ) / 10;
  const delivery =
    ordered.map(el => el.quantity).reduce((prev, cur) => prev + cur, 0) * 1000;
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
      <AuthContext.Provider
        value={{
          products: products.data,
          categories: categories.data,
          loading: {products: products.loading, categories: categories.loading},
          errors: {products: products.error, categories: categories.error},
          ordered,
          onLike: handleSave,
          orderedNum,
          subTotal,
          delivery,
          total,
          // setRecentQueries,
          user,
          setUser,
          addToRecentQuery,
          addToRecentView,
          recentQueries,
          idRecentlyViewed,
          clearRecentQuery,
          clearRecentView,
          addToCart,
          savedItems,
          subFromCart,
          mutateCart,
          removeFromCart,
          onAuthStateChanged,
          retryFetch,
        }}>
        <NavigationContainer ref={navigationRef} theme={navigationTheme}>
          <Host>
            <HomeStack />
          </Host>
        </NavigationContainer>
      </AuthContext.Provider>
      <Toast config={toastConfig} topOffset={5} />
    </>
  );
};

export default App;
