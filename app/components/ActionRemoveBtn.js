import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import colors from '../config/colors';
import {fontSz, wp} from '../config/responsiveSize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppText from './AppText';

const ActionRemoveBtn = ({contentContainerStyle}) => {
  return (
    <View style={[styles.container, contentContainerStyle]}>
      <TouchableHighlight
        style={styles.actionBtn}
        underlayColor={colors.grey_light}
        onPress={() => console.log('Save for later')}>
        <>
          <MaterialCommunityIcons
            style={{marginRight: 3}}
            color={colors.black}
            size={wp(20)}
            name="heart-outline"
          />
          <AppText style={styles.actionLabel}>Save for later</AppText>
        </>
      </TouchableHighlight>
      <View style={{backgroundColor: colors.grey_dark, height: 0.6}}></View>
      <TouchableHighlight
        underlayColor={colors.grey_light}
        style={styles.actionBtn}
        onPress={() => console.log('Save for later')}>
        <>
          <MaterialCommunityIcons
            style={{marginRight: 3}}
            color={colors.black}
            size={wp(20)}
            name="delete-outline"
          />
          <AppText style={styles.actionLabel}>Delete</AppText>
        </>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 5,
    // paddingVertical: 0,
    flex: 1,
    // backgroundColor: 'yellow',
  },
  actionLabel: {
    fontSize: fontSz(12),
  },
});

export default ActionRemoveBtn;
