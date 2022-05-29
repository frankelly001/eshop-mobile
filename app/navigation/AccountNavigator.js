import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import AccountScreen from '../screens/AccountScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import routes from './routes';

const Stack = createNativeStackNavigator();

const AccountNavigator = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={routes.SIGNUP} component={SignupScreen} />
      <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={routes.ACCOUNT} component={AccountScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AccountNavigator;
