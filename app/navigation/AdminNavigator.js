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
import AddFeedScreen from '../screens/AddFeedScreen';
import FeedUpdateScreen from '../screens/FeedUpdateScreen';
import UpdateCarouselScreen from '../screens/UpdateCarouselScreen';
import AddCarouslScreen from '../screens/AddCarouslScreen';
import CarouselUpdateScreen from '../screens/CarouselUpdateScreen';

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
      <Stack.Screen name={routes.ADDFEED} component={AddFeedScreen} />
      <Stack.Screen name={routes.FEEDUPDATE} component={FeedUpdateScreen} />
    </Stack.Navigator>
  );
};

const CarouselsStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: ({...allProps}) => <Header {...allProps} />}}>
      <Stack.Screen
        name={routes.UPDATEFEEDS}
        component={UpdateCarouselScreen}
        options={{title: 'Add | Update | Delete Carousel'}}
      />
      <Stack.Screen name={routes.ADDCAROUSEL} component={AddCarouslScreen} />
      <Stack.Screen
        name={routes.CAROUSELUPDATE}
        component={CarouselUpdateScreen}
      />
    </Stack.Navigator>
  );
};

const AdminNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        options={{
          header: ({...allProps}) => <Header {...allProps} />,
          headerShown: true,
        }}
        name={routes.ADMINDASHBORD}
        component={AdminDashboardScreen}
      />
      <Stack.Screen
        name={routes.UPDATEPRODUCTSSTACK}
        component={ProductsStack}
      />
      {/* <Stack.Screen name={routes.UPDATEPRODUCT} component={UploadScreen} /> */}
      <Stack.Screen name={routes.UPDATEFEEDSSTACK} component={FeedsStacks} />
      <Stack.Screen
        name={routes.UPDATECAROUSELSSTACK}
        component={CarouselsStack}
      />
      {/* <Stack.Screen
        name={routes.UPDATECATEGORYIMAGES}
        component={AddProductScreen}
      /> */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AdminNavigator;
