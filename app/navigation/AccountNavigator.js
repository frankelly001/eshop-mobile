import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from './Header';
import AccountScreen from '../screens/AccountScreen';
import routes from './routes';

const Stack = createNativeStackNavigator();

const AccountNavigator = props => {
  return (
    <Stack.Navigator
      screenOptions={{header: ({...allProps}) => <Header {...allProps} />}}>
      <Stack.Screen name={routes.ACCOUNT} component={AccountScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AccountNavigator;
