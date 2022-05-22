import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
import LinearGradient from 'react-native-linear-gradient';

const ListCard = ({data}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#5d05b5', '#9E1E7C', '#dc3545']}
        style={styles.ListTitleContainer}
        // start={{x: 0.494, y: 0}}
        // end={{x: 0.5, y: 0.95}}

        // locations={[0.1, 0.7, 1]}
        // useAngle={true}
        // angle={179.63}
        // angleCenter={{x: 0.5, y: 0.3}}
        locations={[0.1, 0.7, 1]}
        useAngle={true}
        angle={179.85}
        angleCenter={{x: 0.5, y: 0.4}}>
        <AppText style={styles.ListTitle}>{data.title}</AppText>
      </LinearGradient>
      {/* <View style={styles.ListTitleContainer}>
      </View> */}
      {data.list.map(list => (
        <TouchableOpacity key={list._id} style={styles.ListItemContainer}>
          <View style={styles.listItem}>
            {list.icon && (
              <FontAwesomeIcon
                size={20}
                icon={['far', list.icon]}
                style={{marginRight: 5}}
              />
            )}
            <AppText>{list.name}</AppText>
          </View>
          <FontAwesomeIcon icon="angle-right" />
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
