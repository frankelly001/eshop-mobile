import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import HeaderActions from '../components/HeaderActions';
import CategoriesScreen from '../screens/CategoriesScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import routes from './routes';

const Stack = createNativeStackNavigator();

const CategoriesNavigator = props => {
  return (
    <Stack.Navigator screenOptions={{headerRight: () => <HeaderActions />}}>
      <Stack.Screen name={routes.CATEGORIES} component={CategoriesScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default CategoriesNavigator;
