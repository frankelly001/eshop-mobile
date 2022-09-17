import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import AddProductScreen from '../screens/AddProductScreen';
import Header from './Header';
import routes from './routes';
import UpdateProductsScreen from '../screens/UpdateProductsScreen';
import ProductUpdateScreen from '../screens/ProductUpdateScreen';
import UpdateFeedsScreen from '../screens/UpdateFeedsScreen';

const Stack = createNativeStackNavigator();

const ProductsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: ({...allProps}) => <Header {...allProps} />}}>
      <Stack.Screen
        name={routes.UPDATEPRODUCT}
        component={UpdateProductsScreen}
        options={{title: 'Add | Update | Delete Product'}}
      />
      <Stack.Screen name={routes.ADDPRODUCT} component={AddProductScreen} />
      <Stack.Screen
        name={routes.PRODUCTUPDATE}
        component={ProductUpdateScreen}
      />
    </Stack.Navigator>
  );
};

const FeedsStacks = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: ({...allProps}) => <Header {...allProps} />}}>
      <Stack.Screen
        name={routes.UPDATEFEEDS}
        component={UpdateFeedsScreen}
        options={{title: 'Add | Update | Delete Feed'}}
      />
      {/* <Stack.Screen name={routes.ADDPRODUCT} component={AddProductScreen} />
      <Stack.Screen
        name={routes.PRODUCTUPDATE}
        component={ProductUpdateScreen}
      /> */}
    </Stack.Navigator>
  );
};

const AdminNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: ({...allProps}) => <Header {...allProps} />}}>
      <Stack.Screen
        name={routes.ADMINDASHBORD}
        component={AdminDashboardScreen}
      />
      <Stack.Screen
        name={routes.UPDATEPRODUCTSSTACK}
        component={ProductsStack}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name={routes.UPDATEPRODUCT} component={UploadScreen} /> */}
      <Stack.Screen
        name={routes.UPDATEFEEDSSTACK}
        component={FeedsStacks}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={routes.UPDATECAROUSELIMAGES}
        component={AddProductScreen}
      />
      <Stack.Screen
        name={routes.UPDATECATEGORYIMAGES}
        component={AddProductScreen}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AdminNavigator;
