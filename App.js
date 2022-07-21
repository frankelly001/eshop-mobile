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
import {getUser} from './app/api/setup/getApi/getUser';
import {getUserData, storeUserData} from './app/api/storage/authStorage';
import {useNetInfo} from '@react-native-community/netinfo';
import {getCategories} from './app/api/setup/getApi/getCategories';
import AppButton from './app/components/AppButton';
import {getProducts} from './app/api/products';
import {getProducts as getNewProducts} from './app/api/setup/getApi/getProducts';
import collectionRefs from './app/api/setup/collectionRefs';
import {
  updateUserData,
  userDataTypes,
} from './app/api/setup/patchApi/updateUserData';
import {useCartState} from './app/hooks/useCartState';

const initialState = {
  cartsCount: [],
};

const cartInitialState = {
  orderedItems: [],
  savedItems: [],
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [allCounters, dispatch] = useReducer(reducerFunction, initialState);
  const [cartState, dispatch] = useReducer(reducerFunction, cartInitialState);
  // const [allAddToCart, setAllAddToCart] = useState([]);
  const [ordered, setOrdered] = useState([]);
  const [recentQueries, setRecentQueries] = useState([]);
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(false);
  // const [orderedItems, setOrderedItems] = useState([]);
  // const [savedItems, setSavedItems] = useState([]);

  const {orderedItems, savedItems, actionTypes, dispatchAction} =
    useCartState(user);

  // console.log(orderedItems);

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

  // console.log(orderedItems, savedItems, 'kkkkkkkkkkllopp');

  const netinfo = useNetInfo();
  // console.log(netinfo);

  const onAuthStateChanged = account => {
    if (user && !user.verified) {
      if (account && account.emailVerified) {
        // const updatedUsersData = {...user, verified: account.emailVerified};
        // setUser(updatedUserData);
        // storeUserData(updatedUserData);
        updateUserData(
          account.uid,
          userDataTypes.VERIFIED,
          account.emailVerified,
        );
      } else {
        console.log('User is not Verified');
      }
    }

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
          storeUserData(newUserData);
        }
      });
    return () => subscriber();
  };

  const getUserFromAsynStorage = () => {
    getUserData()
      .then(data => {
        setUser(data);
        // initializeCartState(data);
        // console.log(data, 'DATA................');
      })
      .catch(err => {
        setUser(null);
        console.log('error');
      });
  };

  useEffect(() => {
    const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged);
    getUserFromAsynStorage();
    return authSubscriber;
  }, []);

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
  //   } else {
  //     getUserFromAsynStorage();
  //   }
  // }, [netinfo]);

  const allProducts = async () => {
    const {data, ok, problem} = await getProducts();
    if (!ok) {
      console.log(problem, 'from Products');
      return;
    } else {
      const allCartObj = data.map(pId => {
        return {productId: pId.id, quantity: 0};
      });
      // dispatch({type: 'INITIALIZE', data: allCartObj});
      setProducts(shuffle(data.map(el => ({...el, price: el.price * 430}))));
    }
    // getProducts()
    //   .then(snapshot => {
    //     const allData = [];
    //     snapshot.forEach(el => {
    //       allData.push(el.data());
    //     });
    //     setProducts(allData);
    //   })
    //   .catch(error => {
    //     console.log(error.message, 'kkkkkkkkkkk');
    //   });
  };

  const [newProducts, setNewProducts] = useState([]);

  const fetchProducts = () => {
    getNewProducts()
      .then(snapshot => {
        const allData = [];
        snapshot.forEach(el => {
          // console.log(el.id, 'Each element');
          allData.push({id: el.id, ...el.data()});
        });
        setNewProducts(allData);
      })
      .catch(error => {
        console.log(error.message, 'kkkkkkkkkkk');
      });
  };

  console.log('App.js rendering');

  const allCategories = () => {
    // const {data, ok, problem} = await getCategories();
    // if (!ok) {
    //   console.log(problem, 'from Categories');
    //   return;
    // }
    // return setCategories(data);
    getCategories()
      .then(snapshot => {
        const allCat = [];
        snapshot.forEach(el => {
          // console.log(el.data());
          allCat.push(el.data());
        });
        setCategories(allCat);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    allCategories();
    allProducts();
    fetchProducts();
    SplashScreen.hide();

    return function cleanUp() {};
  }, []);

  // const handleLike = useCallback(
  //   product => {
  //     const newState = [...newProducts];
  //     const index = newState.indexOf(product);
  //     newState[index].like = !newState[index].like;
  //     setProducts(newState);
  //   },
  //   [newProducts],
  // );

  useEffect(() => {
    const orderedID = orderedItems.map(el => el.productId);

    const filteredProduts = newProducts.filter(el => orderedID.includes(el.id));
    const orderedOroducts = filteredProduts.map(el => {
      return {
        ...el,
        quantity: orderedItems.find(ordered => ordered.productId === el.id)
          .quantity,
      };
    });

    // rememeber unshift
    // let orderedOroducts = [];
    // newProducts.forEach(el => {
    //   if (orderedID.includes(el.id))
    //     orderedOroducts.push({
    //       ...el,
    //       quantity: orderedItems.find(ordered => ordered.productId === el.id)
    //         .quantity,
    //     });
    // });
    // console.log(orderedOroducts, 'kkkkllloppppp');
    setOrdered(orderedOroducts);
    // collectionRefs.productsCollectionRef.doc().get
  }, [orderedItems, newProducts]);

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

  if (initializing) return null;
  return (
    <AuthContext.Provider
      value={{
        products,
        categories,
        newProducts,
        ordered,
        onLike: handleSave,
        dispatch,
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
        // initializeCartState,
        // clearCartState,
      }}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <Host>
          <HomeStack />
        </Host>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default gestureHandlerRootHOC(App);

// getUser(account?.uid)
//   .then(data => {
//     const newUser = {...data._data, verified: account.emailVerified};
//     if (data._data) {
//       setUser(newUser);
//       storeUserData(newUser);
//       console.log('heyy  firebase is updating user');
//     } else {
//       setUser(null);
//     }
//   })
//   .catch(() => {
//     setUser(null);
//   });

// const addToCart = id => {
//   if (user) {
//     const previousOrderedItems = orderedItems;
//     let nextOrderedItems = [...orderedItems];
//     if (!nextOrderedItems.some(elOrdered => elOrdered.productId === id)) {
//       nextOrderedItems.push({productId: id, quantity: 1});
//     } else {
//       nextOrderedItems = nextOrderedItems.map(elOrdered =>
//         elOrdered.productId === id
//           ? {productId: id, quantity: elOrdered.quantity + 1}
//           : el,
//       );
//     }

//     setOrderedItems(nextOrderedItems);
//     updateUserData(
//       user.id,
//       userDataTypes.ORDERED_ITEMS,
//       nextOrderedItems,
//     ).catch(() => {
//       setOrderedItems(previousOrderedItems);
//     });
//   }
// };

// const subFromCart = id => {
//   if (user) {
//     const previousOrderedItems = orderedItems;
//     const nextOrderedItems = [...orderedItems].map(elOrdered =>
//       elOrdered.productId === id
//         ? {
//             ...elOrdered,
//             quantity:
//               elOrdered.quantity > 1
//                 ? elOrdered.quantity - 1
//                 : elOrdered.quantity,
//           }
//         : elOrdered,
//     );
//     setOrderedItems(nextOrderedItems);
//     updateUserData(
//       user.id,
//       userDataTypes.ORDERED_ITEMS,
//       nextOrderedItems,
//     ).catch(() => {
//       setOrderedItems(previousOrderedItems);
//     });
//   }
// };

// const handleLike = id => {
//   const previousLikeProducts = savedItems;
//   if (user) {
//     let likedProducts = [...savedItems];
//     if (likedProducts.includes(id)) {
//       likedProducts = likedProducts.filter(productId => productId !== id);
//     } else {
//       likedProducts.push(id);
//     }
//     setSavedItems(likedProducts);

//     updateUserData(user.id, userDataTypes.SAVED_ITEMS, likedProducts)
//       .then(response => {})
//       .catch(error => {
//         setSavedItems(previousLikeProducts);
//         console.log(error, 'heyyyyyyyyy');
//       });
//   }
// };

// const handleLike = id => {
//   if (user) {
//     dispatch({type: actionTypes.ONSAVE, id});

//     updateUserData(user.id, userDataTypes.SAVED_ITEMS, cartState.saved_items)
//       .then(response => {})
//       .catch(error => {
//         setSavedItems(previousLikeProducts);
//         console.log(error, 'heyyyyyyyyy');
//       });
//   }
// };
