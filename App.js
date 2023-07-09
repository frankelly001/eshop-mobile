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
import AppButton from './app/components/AppButton';
import {addAllFeed} from './app/api/Feed';
import ImageUploadTest from './app/components/imageListUpload/ImageUploadTest';

const App = () => {
  useCheckNetworkStatus();

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
      <StatusBar
        backgroundColor={colors.grey_light}
        barStyle={'dark-content'}
      />
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
};

export default App;
