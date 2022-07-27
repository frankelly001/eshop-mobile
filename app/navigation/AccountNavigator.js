import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import AccountScreen from '../screens/AccountScreen';
// import LoginScreen from '../screens/LoginScreen';
// import SignupScreen from '../screens/SignupScreen';
import routes from './routes';

const Stack = createNativeStackNavigator();

const AccountNavigator = props => {
  return (
    <Stack.Navigator
      screenOptions={{header: ({...allProps}) => <Header {...allProps} />}}>
      <Stack.Screen name={routes.ACCOUNT} component={AccountScreen} />
      {/* <Stack.Screen name={routes.SIGNUP} component={SignupScreen} />
      <Stack.Screen name={routes.LOGIN} component={LoginScreen} /> */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AccountNavigator;
