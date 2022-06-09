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
import {getProducts} from './app/api/products';
import reducerFunction from './app/hooks/useRuducer';
import {shuffle} from './app/utilities/randomArr';
import {getCategories} from './app/api/categories';
import {navigationRef} from './app/navigation/rootNavigation';
import AppText from './app/components/AppText';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {Host} from 'react-native-portalize';

const initialState = {
  cartsCount: [],
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allCounters, dispatch] = useReducer(reducerFunction, initialState);
  // const [allAddToCart, setAllAddToCart] = useState([]);
  const [ordered, setOrdered] = useState([]);
  const [recentQueries, setRecentQueries] = useState([]);

  const allProducts = async () => {
    const {data, ok, problem} = await getProducts();
    if (!ok) {
      console.log(problem, 'from Products');
      return;
    } else {
      const allCartObj = data.map(pId => {
        return {productId: pId.id, quantity: 0};
      });
      dispatch({type: 'INITIALIZE', data: allCartObj});
      setProducts(shuffle(data.map(el => ({...el, price: el.price * 430}))));
    }
  };

  console.log('App.js rendering');

  const allCategories = async () => {
    const {data, ok, problem} = await getCategories();
    if (!ok) {
      console.log(problem, 'from Categories');
      return;
    }
    return setCategories(data);
  };
  useEffect(() => {
    allCategories();
    allProducts();

    return function cleanUp() {};
  }, []);

  const handleLike = useCallback(
    product => {
      const newState = [...products];
      const index = newState.indexOf(product);
      newState[index].like = !newState[index].like;
      setProducts(newState);
    },
    [products],
  );

  // useEffect(() => {
  //   const added = allCounters.cartsCount.filter(
  //     counters => counters.quantity > 0,
  //   );
  //   setAllAddToCart(added);
  //   return function cleanUp() {};
  // }, [allCounters.cartsCount]);

  // useEffect(() => {
  //   const orderedID = allAddToCart.map(el => el.productId);
  //   const orderdItems = products.filter(el => {
  //     return orderedID.includes(el.id);
  //   });

  //   orderdItems.map(el => {
  //     return allAddToCart.forEach(cart => {
  //       if (el.id === cart.productId) {
  //         el.quantity = cart.quantity;
  //       }
  //       return el;
  //     });
  //   });

  //   setOrdered(orderdItems);
  //   return function cleanUp() {};
  // }, [allAddToCart]);

  useEffect(() => {
    const allAddToCart = allCounters.cartsCount.filter(
      counters => counters.quantity > 0,
    );
    const orderedID = allAddToCart.map(el => el.productId);
    const orderdItems = products.filter(el => {
      return orderedID.includes(el.id);
    });

    orderdItems.map(el => {
      return allAddToCart.forEach(cart => {
        if (el.id === cart.productId) {
          el.quantity = cart.quantity;
        }
        return el;
      });
    });
    orderdItems.map(el => el.quantity).reduce((prev, cur) => prev + cur, 0);
    console.log('useffect rennding');
    setOrdered(orderdItems);

    // return function cleanUp() {};
  }, [allCounters.cartsCount]);

  // return (
  //   <Screen>
  //     <AppText>heyyy</AppText>
  //   </Screen>
  // );
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

  return (
    <AuthContext.Provider
      value={{
        products,
        categories,
        ordered,
        onLike: handleLike,
        dispatch,
        orderedNum,
        subTotal,
        delivery,
        total,
        setRecentQueries,
        recentQueries,
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
