import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
  useCallback,
} from 'react';
import AuthContext from './app/auth/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import navigationTheme from './app/navigation/navigationTheme';
import HomeStack from './app/navigation/HomeStack';
import reducerFunction from './app/hooks/useRuducer';
import {shuffle} from './app/utilities/randomArr';
// import {getCategories} from './app/api/categories';
import {navigationRef} from './app/navigation/rootNavigation';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';
import SplashScreen from 'react-native-splash-screen';
import {auth, firestore} from './app/api/setup/config';
import {
  authStorageKeys,
  getUserData,
  storeUserData,
} from './app/api/storage/authStorage';
import {useNetInfo} from '@react-native-community/netinfo';
import {getCategories} from './app/api/setup/getApi/getCategories';
import AppButton from './app/components/AppButton';
// import {getProducts} from './app/api/products';
import {getProducts} from './app/api/setup/getApi/getProducts';
import collectionRefs from './app/api/setup/collectionRefs';
import {
  updateUserData,
  userDataTypes,
} from './app/api/setup/patchApi/updateUserData';
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

  // console.log(orderedItems, savedItems, 'kkkkkkkkkkllopp');

  // console.log(netinfo);

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
          const newUserData = {
            id: user.id,
            ...documentSnapshot._data,
          };
          setUser(newUserData);
          storeUserData(authStorageKeys.USER_DATA, newUserData);
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
          }, 1000);
        // initializeCartState(data);
        // console.log(data, 'DATA................');
      })
      .catch(err => {
        setUser(null);
        console.log('error');
      });
    getUserData(authStorageKeys.RECENT_QUERIES)
      .then(data => {
        if (data) setRecentQueries(data);
      })
      .catch(() => {
        setRecentQueries([]);
      });
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
          setRecentQueries,
          recentQueries,
          user,
          setUser,
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

export default gestureHandlerRootHOC(App);
