import React, {useState, useEffect} from 'react';
import AuthContext from './app/auth/AuthContext';
import {NavigationContainer} from '@react-navigation/native';
import navigationTheme from './app/navigation/navigationTheme';
import MainStack from './app/navigation/MainStack';
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
import Store from './app/Store/Store';

const App = () => {
  useCheckNetworkStatus();

  console.log('App.js rendering');

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const toastConfig = {
    appToast: obj => {
      const {text2, props} = obj;
      return <AppToastView message={text2} type={props.toastType} />;
    },
  };

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

export default App;
