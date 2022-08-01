import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from './Header';
import HelpScreen from '../screens/HelpScreen';
import routes from './routes';

const Stack = createNativeStackNavigator();

const HelpNavigator = props => {
  return (
    <Stack.Navigator
      screenOptions={{header: ({...allProps}) => <Header {...allProps} />}}>
      <Stack.Screen name={routes.HELP} component={HelpScreen} />
    </Stack.Navigator>
  );
};

export default HelpNavigator;
