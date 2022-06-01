import React, {useContext} from 'react';
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
import AuthContext from '../auth/AuthContext';

const ActionRemoveBtn = ({contentContainerStyle, product}) => {
  const {dispatch, onLike} = useContext(AuthContext);

  const handleDelete = () => {
    dispatch({type: 'removeItem', id: product.id});
  };

  const handleSaveForLater = () => {
    if (!product.like) onLike(product);
    handleDelete();
  };

  return (
    <View style={[styles.container, contentContainerStyle]}>
      <TouchableHighlight
        style={styles.actionBtn}
        underlayColor={colors.red_dark} // prev grey_light
        onPress={handleSaveForLater}>
        <>
          <MaterialCommunityIcons
            style={{marginRight: 3}}
            color={colors.white}
            size={wp(20)}
            name="heart-outline"
          />
          <AppText style={styles.actionLabel}>Save for later</AppText>
        </>
      </TouchableHighlight>
      <View style={{backgroundColor: colors.grey_dark, height: 0.6}}></View>
      <TouchableHighlight
        underlayColor={colors.red_dark} // prev grey_light
        style={styles.actionBtn}
        onPress={handleDelete}>
        <>
          <MaterialCommunityIcons
            style={{marginRight: 3}}
            color={colors.white}
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
    // paddingVertical: 10,
    marginVertical: 10,
    overflow: 'hidden',
    // width: 100,
    // flex: 1,
    alignSelf: 'flex-end',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    // borderRadius: 5,
    // paddingVertical: 0,
    flex: 1,
    // backgroundColor: 'yellow',
  },
  actionLabel: {
    fontSize: fontSz(12),
    color: colors.white,
    fontWeight: '700',
  },
});

export default ActionRemoveBtn;
