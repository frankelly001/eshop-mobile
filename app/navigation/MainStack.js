import React, {useContext, useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import AppNavigator from './AppNavigator';
import routes from './routes';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import Header from './Header';
import AuthContext from '../auth/AuthContext';
import SearchResultScreen from '../screens/SearchResultScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import NotificationScreen from '../screens/NotificationScreen';
import SavedScreen from '../screens/SavedScreen';
import UserDetailsScreen from '../screens/UserDetailsScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import AddressBookScreen from '../screens/AddressBookScreen';
import ForgottenPasswordScreen from '../screens/ForgottenPasswordScreen';
import OnBoardingScreen from '../screens/OnBoardingScreen';
import RecentlyViewed from '../screens/RecentlyViewed';
import RecentlySearched from '../screens/RecentlySearched';
import VouchersScreen from '../screens/VouchersScreen';
import PendingReviewsScreen from '../screens/PendingReviewsScreen';
import {authStorageKeys, getUserData} from '../api/storage/authStorage';
import OrdersScreen from '../screens/OrdersScreen';
import AuthNavigator from './AuthNavigator';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import AdminNavigator from './AdminNavigator';
import ProductDescriptionScreen from '../screens/ProductDescriptionScreen';

const Stack = createNativeStackNavigator();

const MainStack = props => {
  const {numOfCartItems, user} = useContext(AuthContext);
  const [appUseReady, setAppUseReady] = useState(null);

  useEffect(() => {
    getUserData(authStorageKeys.APP_USE_READY).then(readyForUse => {
      if (readyForUse) setAppUseReady(true);
      else setAppUseReady(false);
    });
  }, []);

  if (appUseReady === null) return null;
  return (
    <Stack.Navigator
      initialRouteName={appUseReady ? routes.ESHOP : routes.ONBOARDINGSCREEN}
      screenOptions={{
        header: ({...allProps}) => <Header {...allProps} />,
      }}>
      {!appUseReady && (
        <Stack.Screen
          name={routes.ONBOARDINGSCREEN}
          component={OnBoardingScreen}
          options={{
            headerShown: false,
          }}
        />
      )}
      <Stack.Screen
        name={routes.ESHOP}
        component={AppNavigator}
        options={{
          title: 'eShop',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={routes.PRODUCTDETAILS}
        component={ProductDetailsScreen}
        options={{
          title: 'Details',
          headerStyle: {},
        }}
      />
      <Stack.Screen
        name={routes.PRODUCTDESCRIPTION}
        component={ProductDescriptionScreen}
        options={{
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name={routes.CART}
        component={CartScreen}
        options={{
          title: `Cart ${numOfCartItems > 0 ? `(${numOfCartItems})` : ''}`,

          animation: 'slide_from_right',
          // headerStyle: {backgroundColor: 'red'},
        }}
      />
      <Stack.Screen
        name={routes.NOTIFICATION}
        component={NotificationScreen}
        options={{
          animation: 'slide_from_right',
          // headerStyle: {backgroundColor: 'red'},
        }}
      />
      <Stack.Screen
        name={routes.CHECKOUT}
        component={CheckoutScreen}
        options={{
          title: 'Checkout',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name={routes.SEARCHED}
        component={SearchResultScreen}
        options={({route}) => ({
          title: route.params.query,
          animation: 'slide_from_bottom',
        })}
      />

      <Stack.Screen
        name={routes.SAVED}
        component={SavedScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name={routes.ORDERS}
        component={OrdersScreen}
        options={({route}) => ({
          animation:
            route?.params === routes.HOME
              ? 'slide_from_bottom'
              : 'slide_from_right',
        })}
      />
      <Stack.Screen name={routes.ORDERDETAILS} component={OrderDetailsScreen} />
      <Stack.Screen
        name={routes.ADDRESSBOOK}
        component={AddressBookScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name={routes.USERDETAILS}
        component={UserDetailsScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name={routes.RECENTLY_VIEWED}
        component={RecentlyViewed}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name={routes.VOUCHERS}
        component={VouchersScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name={routes.PENDING_REVIEWS}
        component={PendingReviewsScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name={routes.RECENTLY_SEARCHED}
        component={RecentlySearched}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name={routes.CHANGEPASSWORD}
        component={ChangePasswordScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name={routes.FORGOTPASSWORD}
        component={ForgottenPasswordScreen}
      />
      <Stack.Screen
        name={routes.ADMIN}
        component={AdminNavigator}
        options={{headerShown: false, animation: 'slide_from_right'}}
      />

      {/* {!user && <Stack.Screen name={routes.SIGNUP} component={SignupScreen} />}
      {!user && <Stack.Screen name={routes.LOGIN} component={LoginScreen} />} */}
      {!user && (
        <Stack.Screen
          name={routes.AUTH}
          component={AuthNavigator}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

export default MainStack;
