import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import HeaderActions from '../components/HeaderActions';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import AppNavigator from './AppNavigator';
import routes from './routes';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import Header from '../components/Header';

const Stack = createNativeStackNavigator();

const HomeStack = props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => <HeaderActions />,
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
          header: ({navigation}) => <Header navigation={navigation} />,
          headerStyle: {},
        }}
      />
      <Stack.Screen
        name={routes.CART}
        component={CartScreen}
        options={{
          title: 'Cart',
          // headerStyle: {backgroundColor: 'red'},
        }}
      />
      <Stack.Screen
        name={routes.CHECKOUT}
        component={CheckoutScreen}
        options={{
          title: 'Checkout',
          // headerStyle: {backgroundColor: 'red'},
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
