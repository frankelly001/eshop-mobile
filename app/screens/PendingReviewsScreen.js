import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../components/AppText';
import fonts from '../config/fonts';

const PendingReviewsScreen = () => {
  return (
    <View style={styles.container}>
      <AppText style={styles.text}>No Pending Reviews</AppText>
      <AppText style={styles.subText}>
        You don't have any pending reviews.
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: fonts.semi_bold,
  },
  subText: {
    marginBottom: 100,
    textAlign: 'center',
  },
});

export default PendingReviewsScreen;
