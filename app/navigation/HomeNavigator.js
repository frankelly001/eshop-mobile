import React from 'react';
import {StyleSheet, View} from 'react-native';
import routes from './routes';
import HomeScreen from '../screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HeaderActions from '../components/HeaderActions';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import {fontSz} from '../config/responsiveSize';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => <HeaderActions />,
      }}>
      <Stack.Screen
        name={routes.HOME}
        component={HomeScreen}
        options={{
          title: 'eShop',
          headerTitleStyle: {fontSize: fontSz(30)},
          // headerRight: () => <HeaderActions />,
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default HomeNavigator;
