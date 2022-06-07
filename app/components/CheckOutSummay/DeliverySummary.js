import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppText from '../AppText';
import SummaryStyles from './SummaryStyles';

const DeliverySummary = props => {
  return (
    <>
      <View style={SummaryStyles.modalHeaderContainer}>
        <AppText style={SummaryStyles.modalHeader}>Customer Detail</AppText>
      </View>
      <View style={SummaryStyles.modalSubHeaderContainer}>
        <AppText style={SummaryStyles.modalSubHeader}>DELIVERY DETAILS</AppText>
      </View>
      <View style={SummaryStyles.modalDetailsContainer}>
        <View style={SummaryStyles.modalDetail}>
          <AppText style={SummaryStyles.modalDetailLabel}>Firstname:</AppText>
          <AppText>{'Franklyn'}</AppText>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default DeliverySummary;
