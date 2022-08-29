import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../components/AppText';

const OrderDetailsScreen = ({route}) => {
  const {orderedItems} = useContext(AuthContext);
  const [ordered, setOrderd] = useState(null);

  return (
    <View style={styles.container}>
      <AppText>Order Details {route.params}</AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default OrderDetailsScreen;
