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
import fonts from '../config/fonts';

const ActionRemoveBtn = ({contentContainerStyle, product}) => {
  const {dispatch, onLike, removeFromCart, savedItems} =
    useContext(AuthContext);

  const handleDelete = () => {
    removeFromCart(product.id);
  };

  const handleSaveForLater = () => {
    if (!savedItems.includes(product.id)) onLike(product.id);
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
            size={18}
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
            size={18}
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
    fontSize: fontSz(8),
    color: colors.white,
    fontFamily: fonts.bold,
  },
});

export default ActionRemoveBtn;
