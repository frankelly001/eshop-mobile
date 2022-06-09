import React from 'react';
import {StyleSheet, View} from 'react-native';
import colors from '../../config/colors';
import AppText from '../AppText';
import SummaryStyles from './SummaryStyles';

const DeliverySummary = ({deliveryInfo}) => {
  console.log(deliveryInfo, 'paddo');
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
          <AppText>{deliveryInfo.firstname}</AppText>
        </View>
        <View style={SummaryStyles.modalDetail}>
          <AppText style={SummaryStyles.modalDetailLabel}>Lastname:</AppText>
          <AppText>{deliveryInfo.lastname}</AppText>
        </View>
        <View style={SummaryStyles.modalDetail}>
          <AppText style={SummaryStyles.modalDetailLabel}>Email:</AppText>
          <AppText>{deliveryInfo.email}</AppText>
        </View>
        <View style={SummaryStyles.modalDetail}>
          <AppText style={SummaryStyles.modalDetailLabel}>Phone:</AppText>
          <AppText>{deliveryInfo.phone1}</AppText>
        </View>
        <View style={SummaryStyles.modalDetail}>
          <AppText style={SummaryStyles.modalDetailLabel}>
            Additional Phone:
          </AppText>
          {deliveryInfo.phone2 ? (
            <AppText>{deliveryInfo.phone2}</AppText>
          ) : (
            <AppText style={{color: colors.red_dark}}>Not Available</AppText>
          )}
        </View>
        <View style={SummaryStyles.modalDetail}>
          <AppText style={SummaryStyles.modalDetailLabel}>City:</AppText>
          <AppText>{deliveryInfo.city}</AppText>
        </View>
        <View style={SummaryStyles.modalDetail}>
          <AppText style={SummaryStyles.modalDetailLabel}>Street No:</AppText>
          <AppText>{deliveryInfo.number}</AppText>
        </View>
        <View style={SummaryStyles.modalDetail}>
          <AppText style={SummaryStyles.modalDetailLabel}>Street:</AppText>
          <AppText>{deliveryInfo.street}</AppText>
        </View>
        <View style={SummaryStyles.modalDetail}>
          <AppText style={SummaryStyles.modalDetailLabel}>Zipcode:</AppText>
          <AppText>{deliveryInfo.zipcode}</AppText>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default DeliverySummary;
