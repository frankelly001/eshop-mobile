import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {AccountDetails, AccountSettings} from '../api/account';
import AppGradientText from '../components/AppGradientText';
import AppText from '../components/AppText';
import ListCard from '../components/ListCard';
import Screen from '../components/Screen';
import colors from '../config/colors';

const dimensions = Dimensions.get('screen');
const AccountScreen = props => {
  return (
    <Screen>
      <View style={styles.welcomeContainer}>
        <AppGradientText style={styles.welcome}>
          <AppGradientText style={[styles.welcome, styles.welcomeColor]}>
            Welcome{' '}
          </AppGradientText>
          Franklyn!
        </AppGradientText>
        <AppText style={styles.welcome}>Frankelly344@gmail.com</AppText>
      </View>
      <View style={styles.actBalContainer}>
        <AppText style={styles.actBalLabel}>Account Balance</AppText>
        <AppText style={[styles.actBalLabel, styles.bal]}>₦150,870</AppText>
      </View>
      <ListCard data={AccountDetails} />
      <ListCard data={AccountSettings} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {},
  welcomeContainer: {
    width: '100%',
    height: 0.13 * dimensions.height,
    backgroundColor: colors.grey_light,
    justifyContent: 'flex-end',
    padding: 10,
  },
  welcome: {
    // fontWeight: '700',
    fontSize: 13.5,
    // color: colors.grey_dark_3,
  },
  welcomeColor: {
    fontWeight: '700',
    // color: colors.purple,
  },
  actBalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.green,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  actBalLabel: {
    color: colors.white,
  },
  bal: {
    fontWeight: '700',
  },
});

export default AccountScreen;
