import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import UploadScreen from '../screens/UploadScreen';
import Header from './Header';
import routes from './routes';

const Stack = createNativeStackNavigator();

const AdminNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{header: ({...allProps}) => <Header {...allProps} />}}>
      <Stack.Screen
        name={routes.ADMINDASHBORD}
        component={AdminDashboardScreen}
      />
      <Stack.Screen name={routes.UPLOADPRODUCT} component={UploadScreen} />
      <Stack.Screen name={routes.UPDATEPRODUCT} component={UploadScreen} />
      <Stack.Screen name={routes.DELETEPRODUCT} component={UploadScreen} />
      <Stack.Screen
        name={routes.UPDATECAROUSELIMAGES}
        component={UploadScreen}
      />
      <Stack.Screen
        name={routes.UPDATECATEGORYIMAGES}
        component={UploadScreen}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AdminNavigator;
