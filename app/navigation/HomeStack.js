import React, {useContext} from 'react';
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

const Stack = createNativeStackNavigator();

const HomeStack = props => {
  const {orderedNum, user} = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({...allProps}) => <Header {...allProps} />,
      }}>
      <Stack.Screen
        name={'eShop'}
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
        name={routes.CART}
        component={CartScreen}
        options={{
          title: `Cart ${orderedNum > 0 ? `(${orderedNum})` : ''}`,

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
        })}
      />

      {!user && <Stack.Screen name={routes.SIGNUP} component={SignupScreen} />}
      {!user && <Stack.Screen name={routes.LOGIN} component={LoginScreen} />}
    </Stack.Navigator>
  );
};

export default HomeStack;
