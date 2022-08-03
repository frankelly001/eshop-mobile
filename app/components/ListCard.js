import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import GradientBackground from './GradientBackground';
import fonts from '../config/fonts';
import navigation from '../navigation/rootNavigation';

const ListCard = ({data}) => {
  return (
    <View style={styles.container}>
      <GradientBackground style={styles.ListTitleContainer}>
        <AppText style={styles.ListTitle}>{data.title}</AppText>
      </GradientBackground>
      {/* <View style={styles.ListTitleContainer}>
      </View> */}
      {data.list.map(list => (
        <TouchableOpacity
          key={list._id}
          style={styles.ListItemContainer}
          onPress={() => list.routeName && navigation.navigate(list.routeName)}>
          <View style={styles.listItem}>
            {list.icon && <list.icon size={20} style={{marginRight: 5}} />}
            <AppText>{list.name}</AppText>
          </View>
          <FontAwesomeIcon size={20} name="angle-right" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  ListTitleContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  ListTitle: {
    color: colors.white,
    fontFamily: fonts.semi_bold,
  },
  ListItemContainer: {
    // backgroundColor: colors.purple_Transparent,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ListCard;
