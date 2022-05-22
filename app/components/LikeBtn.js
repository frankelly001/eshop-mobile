import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useContext, memo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import AuthContext from '../auth/AuthContext';
import colors from '../config/colors';

const LikeBtn = ({product}) => {
  const {onLike} = useContext(AuthContext);
  const type = product.like ? 'fas' : 'far';
  console.log('LikeBtn rendering', 'check---', product.like);
  return (
    <TouchableOpacity style={styles.container} onPress={() => onLike(product)}>
      <FontAwesomeIcon size={30} color={colors.purple} icon={[type, 'heart']} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 45,
    backgroundColor: colors.purple_Transparent,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});

export default memo(LikeBtn);
