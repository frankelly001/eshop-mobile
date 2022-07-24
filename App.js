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

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ordered, setOrdered] = useState([]);
  const [recentQueries, setRecentQueries] = useState([]);
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(false);

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
          storeUserData(authStorageKeys.USER_DATA, newUserData);
        }
      });
    return () => subscriber();
  };

  const getAllUserDataFromAsynStorage = () => {
    getUserData(authStorageKeys.USER_DATA)
      .then(data => {
        if (data) setUser(data);
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
  //   } else {
  //     getUserFromAsynStorage();
  //   }
  // }, [netinfo]);

  const fetchProducts = () => {
    getProducts()
      .then(snapshot => {
        const allData = [];
        snapshot.forEach(el => {
          allData.push({id: el.id, ...el.data()});
        });
        setProducts(allData);
      })
      .catch(error => {
        console.log(error.message, 'kkkkkkkkkkk');
      });
  };

  console.log('App.js rendering');

  const fetchCategories = () => {
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
    fetchCategories();
    fetchProducts();
    SplashScreen.hide();

    const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged);
    getAllUserDataFromAsynStorage();
    return authSubscriber;
  }, []);

  useEffect(() => {
    const orderedID = orderedItems.map(el => el.productId);

    const filteredProduts = products.filter(el => orderedID.includes(el.id));
    const orderedOroducts = filteredProduts.map(el => {
      return {
        ...el,
        quantity: orderedItems.find(ordered => ordered.productId === el.id)
          .quantity,
      };
    });
    setOrdered(orderedOroducts);
  }, [orderedItems, products]);

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
    <>
      <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
      <AuthContext.Provider
        value={{
          products,
          categories,
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
        }}>
        <NavigationContainer ref={navigationRef} theme={navigationTheme}>
          <Host>
            <HomeStack />
          </Host>
        </NavigationContainer>
      </AuthContext.Provider>
    </>
  );
};

export default gestureHandlerRootHOC(App);
// "usernames" : {
//   "$username": {
//   ".write": "!data.exists() && auth!= null && newData.val() == auth.uid"
//   }
//  },
// }

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
