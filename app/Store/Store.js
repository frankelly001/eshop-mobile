import React, {useEffect, useState} from 'react';
import collectionRefs from '../api/setup/collectionRefs';
import {auth} from '../api/setup/config';
import {getCategories} from '../api/setup/getApi/getCategories';
import {getProducts} from '../api/setup/getApi/getProducts';
import {
  authStorageKeys,
  getUserData,
  removeUserData,
  storeUserData,
} from '../api/storage/authStorage';
import AuthContext from '../auth/AuthContext';
import {showToast} from '../components/AppToast/showToast';
import toast from '../components/AppToast/toast';
import {useCartState} from '../hooks/useCartState';
import {useCheckNetworkStatus} from '../hooks/useCheckNetworkStatus';

const Store = ({children}) => {
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

  //   useCheckNetworkStatus();

  const {cartItems, orderedItems, savedItems, actionTypes, dispatchAction} =
    useCartState(user);

  const initializeCartState = data => {
    dispatchAction({
      type: actionTypes.INITIALIZE_CART,
      payload: data.cart_items,
    });
    dispatchAction({
      type: actionTypes.INITIALIZE_SAVE,
      payload: data.odered_items,
    });
    dispatchAction({
      type: actionTypes.INITIALIZE_SAVE,
      payload: data.saved_items,
    });
  };

  const clearCartState = () => {
    dispatchAction({type: actionTypes.CLEAR_CART});
    dispatchAction({type: actionTypes.CLEAR_SAVE});
  };

  const handleSave = id => {
    dispatchAction({type: actionTypes.ONSAVE, id});
  };

  const addToOrders = payload => {
    dispatchAction({payload});
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

  const onProductSubscriber = () => {
    setProducts({...products, loading: true});
    const subscriber = collectionRefs.productsCollectionRef.onSnapshot(
      documentSnapshot => {
        const data = [];
        documentSnapshot.forEach(el => {
          data.push({id: el.id, ...el.data()});
        });
        // setProducts({...products, data});
        setTimeout(() => {
          setProducts({...products, data, loading: false});
        }, 2000);
      },
    );
    return () => subscriber();
  };

  const onCategorySubscriber = () => {
    setCategories({...categories, loading: true});
    const subscriber = collectionRefs.categoryCollectionRef.onSnapshot(
      documentSnapshot => {
        // if (!categories.loading && categories.data.length) {
        const data = [];
        documentSnapshot.forEach(el => {
          // console.log(el.data());
          data.push(el.data());
        });

        // setCategories({...categories, data});
        // console.log(data, 'snappppp');
        setTimeout(() => {
          setCategories({...categories, data, loading: false});
        }, 2000);
      },
    );
    return () => subscriber();
  };

  useEffect(() => {
    onProductSubscriber();
    onCategorySubscriber();
  }, []);

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
    // fetchCategories();
    // fetchProducts();

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

  if (initializing) return null;

  return (
    <AuthContext.Provider
      value={{
        products: products.data,
        categories: categories.data,
        loading: {products: products.loading, categories: categories.loading},
        errors: {products: products.error, categories: categories.error},
        productsInCart,
        onLike: handleSave,
        numOfCartItems,
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
        addToOrders,
        savedItems,
        orderedItems,
        subFromCart,
        mutateCart,
        removeFromCart,
        onAuthStateChanged,
        retryFetch,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Store;
