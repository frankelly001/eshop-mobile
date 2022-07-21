// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useContext, memo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import AuthContext from '../auth/AuthContext';
import colors from '../config/colors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {wp} from '../config/responsiveSize';

const LikeBtn = ({productId, size = 25}) => {
  const {onLike, savedItems} = useContext(AuthContext);
  const heartType = savedItems.includes(productId) ? 'heart' : 'heart-o';
  // console.log('LikeBtn rendering', 'check---', product.like);
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {width: wp(size + size * 0.6), height: wp(size + size * 0.6)},
      ]}
      onPress={() => onLike(productId)}>
      <FontAwesomeIcon size={wp(size)} name={heartType} color={colors.purple} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.purple_Transparent,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});

export default memo(LikeBtn);
