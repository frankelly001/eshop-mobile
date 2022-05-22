import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import FeedScreen from '../screens/FeedScreen';
import routes from './routes';

const Stack = createNativeStackNavigator();

const FeedNavigator = props => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={routes.FEED} component={FeedScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default FeedNavigator;
