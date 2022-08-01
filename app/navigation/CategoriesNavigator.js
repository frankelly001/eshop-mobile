import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from './Header';
import CategoriesScreen from '../screens/CategoriesScreen';
import routes from './routes';

const Stack = createNativeStackNavigator();

const CategoriesNavigator = props => {
  return (
    <Stack.Navigator
      screenOptions={{header: ({...allProps}) => <Header {...allProps} />}}>
      <Stack.Screen name={routes.CATEGORIES} component={CategoriesScreen} />
    </Stack.Navigator>
  );
};

export default CategoriesNavigator;
