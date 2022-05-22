import React from 'react';
import {StyleSheet, View} from 'react-native';

const productDetails = ({route}) => {
  console.log(route.params);
  return (
    <View style={styles.container}>
      <Text>it product details</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
  },
});

export default productDetails;
