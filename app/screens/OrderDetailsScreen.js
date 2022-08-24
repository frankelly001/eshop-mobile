import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../components/AppText';

const OrderDetailsScreen = props => {
  return (
    <View style={styles.container}>
      <AppText>Order Details</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default OrderDetailsScreen;
