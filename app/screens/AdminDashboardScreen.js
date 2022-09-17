import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import AppGradientBtn from '../components/AppGradientBtn';
import routes from '../navigation/routes';

const adminRoutes = [
  {
    routeName: routes.UPDATEPRODUCTSSTACK,
    title: 'Add | Update | Delete Product',
  },
  {
    routeName: routes.UPDATEFEEDSSTACK,
    title: 'Update Feed',
  },
  {
    routeName: routes.UPDATECAROUSELIMAGES,
    title: 'Update Carousel images',
  },
  {
    routeName: routes.UPDATECATEGORYIMAGES,
    title: 'Update Category images',
  },
];

const AdminDashboardScreen = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
      }}>
      {adminRoutes.map(item => (
        <AppGradientBtn
          key={item.routeName}
          label={item.title}
          onPress={() => navigation.navigate(item.routeName)}
          containerStyle={{marginVertical: 20}}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AdminDashboardScreen;
