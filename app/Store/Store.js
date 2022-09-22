import React, {useEffect, useMemo, useState} from 'react';
import collectionRefs from '../api/setup/collectionRefs';
import {auth} from '../api/setup/config';
import {getCarousel} from '../api/setup/getApi/getCarousel';
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
import {formatErrorMessage} from '../utilities/formatErrorMessage';

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
  const [feeds, setFeeds] = useState({
    loading: true,
    data: [],
    error: null,
  });
  const [carousel, setCarousel] = useState({
    loading: true,
    data: [],
    error: null,
  });
  const [productsInCart, setProductsInCart] = useState([]);
  const [numOfCartItems, setNumOfCartItems] = useState();
  const [subTotal, setSubTotal] = useState();
  const [delivery, setDelivery] = useState();
  const [total, setTotal] = useState();
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
      payload: data?.cart_items ?? [],
    });
    dispatchAction({
      type: actionTypes.INITIALIZE_SAVE,
      payload: data?.saved_items ?? [],
    });
    fetchOrders(user.id);
  };

  const clearCartState = () => {
    dispatchAction({type: actionTypes.CLEAR_CART});
    dispatchAction({type: actionTypes.CLEAR_SAVE});
  };

  const handleSave = id => {
    dispatchAction({type: actionTypes.ONSAVE, id});
  };

  const addToOrders = payload => {
    dispatchAction({type: actionTypes.ADD_TO_ORDERS, payload});
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
    // if (account && account.emailVerified) {
    //   // if (user && !user.verified) {

    //   updateUserData(
    //     account.uid,
    //     userDataTypes.VERIFIED,
    //     account.emailVerified,
    //   ).then(() => {
    //     showToast(toast.types.SUCCESS, 'Your account is now verified');
    //   });
    //   // }
    // } else {

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
        // setTimeout(() => {
        setProducts({...products, data, loading: false});
        // }, 2000);
      },
    );
    return () => subscriber();
  };

  const fetchOrders = userId => {
    collectionRefs.usersOrderCollectionRef
      .where('userId', '==', userId)
      .orderBy('date_ordered', 'desc')
      .get()
      .then(documentSnapshot => {
        const data = [];
        documentSnapshot.forEach(el => {
          data.push(el.data());
        });
        dispatchAction({
          type: actionTypes.INITIALIZE_ORDERS,
          payload: data,
        });
      });
  };

  const onCategorySubscriber = () => {
    setCategories({...categories, loading: true});
    const subscriber = collectionRefs.categoryCollectionRef.onSnapshot(
      documentSnapshot => {
        const data = [];
        documentSnapshot.forEach(el => {
          data.push({id: el.id, ...el.data()});
        });

        setCategories({...categories, data, loading: false});
      },
    );
    return () => subscriber();
  };

  const onCarouselSubscriber = () => {
    setCarousel({...carousel, loading: true});
    const subscriber = collectionRefs.carouselCollectionRef.onSnapshot(
      documentSnapshot => {
        const data = [];
        documentSnapshot.forEach(el => {
          data.push({id: el.id, ...el.data()});
        });

        setCarousel({...carousel, data, loading: false});
      },
    );
    return () => subscriber();
  };

  const onFeedSubscriber = () => {
    setFeeds({...feeds, loading: true});
    const subscriber = collectionRefs.feedsCollectionRef.onSnapshot(
      documentSnapshot => {
        const data = [];
        documentSnapshot.forEach(el => {
          data.push({id: el.id, ...el.data()});
        });

        setFeeds({...feeds, data, loading: false});
      },
    );
    return () => subscriber();
  };

  useEffect(() => {
    onProductSubscriber();
    onCategorySubscriber();
    onFeedSubscriber();
    onCarouselSubscriber();
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
    } else {
      clearCartState(user);
    }
    onUserSubscriber();
  }, [user?.id]);

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
        setProducts({
          ...products,
          error: formatErrorMessage(error),
          loading: false,
        });
        showToast(toast.types.ERROR, formatErrorMessage(error));
      });
  };

  const retryFetch = () => {
    if (!products.data.length) fetchProducts();
    if (!categories.data.length) fetchCategories();
  };

  const fetchCategories = () => {
    setCategories({...categories, loading: true});
    getCategories()
      .then(snapshot => {
        const data = [];
        snapshot.forEach(el => {
          data.push({id: el.id, ...el.data()});
        });
        setTimeout(() => {
          setCategories({...categories, data, loading: false});
        }, 2000);
      })
      .catch(error => {
        setCategories({
          ...categories,
          error: formatErrorMessage(error),
          loading: false,
        });
        showToast(toast.types.ERROR, formatErrorMessage(error));
      });
  };

  // const fetchCarousel = () => {
  //   setCarousel({...carousel, loading: true});
  //   getCarousel()
  //     .then(documentSnapshot => {
  //       const data = [];
  //       documentSnapshot.forEach(el => {
  //
  //         data.push({id: el.id, ...el.data()});
  //       });

  //       setCarousel({...carousel, data, loading: false});
  //     })
  //     .catch(error => {
  //       setProducts({
  //         ...carousel,
  //         error: formatErrorMessage(error),
  //         loading: false,
  //       });
  //       showToast(toast.types.ERROR, formatErrorMessage(error));
  //     });
  // };

  useEffect(() => {
    // fetchCategories();
    // fetchProducts();

    const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged);
    getAllUserDataFromAsynStorage();
    return authSubscriber;
  }, []);

  const recentlyViewed = useMemo(() => {
    const viewed = [];
    for (let i = 0; i < idRecentlyViewed.length; i++) {
      products.data.forEach(el => {
        if (idRecentlyViewed[i] === el.id) viewed.push(el);
      });
    }
    return viewed;
  }, [idRecentlyViewed]);

  const savedProducts = useMemo(() => {
    const saved = [];
    for (let i = 0; i < savedItems.length; i++) {
      products.data.forEach(el => {
        if (savedItems[i] === el.id) saved.push(el);
      });
    }
    return saved;
  }, [savedItems]);

  // useEffect(()=> {

  // })

  useEffect(() => {
    // const cartItemIDs = cartItems.map(el => el.productId);
    // const filteredProductsInCart = products.data.filter(el =>
    //   cartItemIDs.includes(el.id),
    // );
    // const cartProducts = filteredProductsInCart.map(el => {
    //   return {
    //     ...el,
    //     quantity: cartItems.find(item => item.productId === el.id).quantity,
    //   };
    // });

    const cartProducts = [];

    for (let i = 0; i < cartItems.length; i++) {
      products.data.forEach(el => {
        if (cartItems[i].productId === el.id)
          cartProducts.push({
            ...el,
            quantity: cartItems[i].quantity,
          });
      });
    }

    setProductsInCart(cartProducts);
    setNumOfCartItems(
      cartProducts.map(el => el.quantity).reduce((prev, cur) => prev + cur, 0),
    );

    const deliveryFee =
      cartProducts.map(el => el.quantity).reduce((prev, cur) => prev + cur, 0) *
      1000;

    const subTotalFee =
      Math.round(
        cartProducts
          .map(el => el.price * el.quantity)
          .reduce((prev, cur) => prev + cur, 0) * 10,
      ) / 10;

    setDelivery(deliveryFee);
    setSubTotal(subTotalFee);
    setTotal(subTotalFee + deliveryFee);
  }, [cartItems, products?.data]);

  if (initializing) return null;

  return (
    <AuthContext.Provider
      value={{
        products: products.data,
        categories: categories.data,
        feeds: feeds.data,
        carousel: carousel.data,
        loading: {
          products: products.loading,
          categories: categories.loading,
          feeds: feeds.loading,
          carousel: carousel.loading,
        },
        errors: {
          products: products.error,
          categories: categories.error,
          feeds: feeds.error,
          carousel: carousel.error,
        },
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
        recentlyViewed,
        clearRecentQuery,
        clearRecentView,
        addToCart,
        addToOrders,
        savedItems,

        savedProducts,
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
