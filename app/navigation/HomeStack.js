import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import HeaderActions from '../components/HeaderActions';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import AppNavigator from './AppNavigator';
import routes from './routes';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import Header from '../components/Header';
import AuthContext from '../auth/AuthContext';

const Stack = createNativeStackNavigator();

const HomeStack = props => {
  const {orderedNum} = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        // headerRight: () => <HeaderActions />,
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
          // header: ({navigation, route}) => (
          //   <Header navigation={navigation} title={options.title} />
          // ),
          headerStyle: {},
        }}
      />
      <Stack.Screen
        name={routes.CART}
        component={CartScreen}
        options={{
          title: `Cart ${orderedNum > 0 ? `(${orderedNum})` : ''}`,
          // header: ({navigation}) => (
          //   <Header
          //     navigation={navigation}
          //     title="Cart"
          //     disableHeaderRight
          //     backIcon="close"
          //   />
          // ),
          animation: 'slide_from_right',
          // headerStyle: {backgroundColor: 'red'},
        }}
      />
      <Stack.Screen
        name={routes.CHECKOUT}
        component={CheckoutScreen}
        options={{
          title: 'Checkout',
          // header: ({navigation}) => (
          //   <Header
          //     navigation={navigation}
          //     title="Checkout"
          //     disableHeaderRight
          //   />
          // ),
          // headerStyle: {backgroundColor: 'red'},
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
