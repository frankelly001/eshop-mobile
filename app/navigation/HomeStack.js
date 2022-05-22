import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import HeaderActions from '../components/HeaderActions';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import AppNavigator from './AppNavigator';
import routes from './routes';
import CartScreen from '../screens/CartScreen';

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
        }}
      />
      <Stack.Screen
        name={routes.CART}
        component={CartScreen}
        options={{
          title: 'Cart',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
