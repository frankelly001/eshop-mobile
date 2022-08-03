import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../components/AppText';
import colors from '../config/colors';
import fonts from '../config/fonts';

const UserDetailsScreen = props => {
  const [edittedValues, setEdittedValues] = useState({
    firstname: {},
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <AppText style={styles.header}>Personal Information</AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  headerContainer: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: colors.grey_light_4,
  },
  header: {
    color: colors.grey_dark_4,
    fontFamily: fonts.bold,
  },
});

export default UserDetailsScreen;
