// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useContext, memo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import AuthContext from '../auth/AuthContext';
import colors from '../config/colors';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {wp} from '../config/responsiveSize';

const LikeBtn = ({product}) => {
  const {onLike} = useContext(AuthContext);
  const heartType = product.like ? 'heart' : 'heart-o';
  console.log('LikeBtn rendering', 'check---', product.like);
  return (
    <TouchableOpacity style={styles.container} onPress={() => onLike(product)}>
      <FontAwesomeIcon size={wp(25)} name={heartType} color={colors.purple} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(40),
    height: wp(40),
    backgroundColor: colors.purple_Transparent,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});

export default memo(LikeBtn);
