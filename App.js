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
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {getCategories} from './app/api/categories';
import {navigationRef} from './app/navigation/rootNavigation';

library.add(fas, far);

const initialState = {
  cartsCount: [],
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [allCounters, dispatch] = useReducer(reducerFunction, initialState);
  // const [allAddToCart, setAllAddToCart] = useState([]);
  const [ordered, setOrdered] = useState([]);
  const [orderedNum, setOrderedNum] = useState();

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

  // const handleLike = product => {
  //   const newState = [...products];
  //   const index = newState.indexOf(product);
  //   newState[index].like = !newState[index].like;
  //   setProducts(newState);
  // };

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
    setOrderedNum(
      orderdItems.map(el => el.quantity).reduce((prev, cur) => prev + cur, 0),
    );
    // return function cleanUp() {};
  }, [allCounters.cartsCount]);
  // console.log(ordered);

  // const orderedNum = ordered
  //   .map(el => el.quantity)
  //   .reduce((prev, cur) => prev + cur, 0);

  // const orderedNum = useMemo(
  //   () => ordered.map(el => el.quantity).reduce((prev, cur) => prev + cur, 0),
  //   [ordered],
  // );
  if (products.length < 1) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        products,
        categories,
        ordered,
        onLike: handleLike,
        dispatch,
        orderedNum,
      }}>
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <HomeStack />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
