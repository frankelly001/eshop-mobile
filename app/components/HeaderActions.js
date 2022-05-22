import React, {useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import SearchIcon from '../assets/icons/search.svg';
import NoficationActiveIcon from '../assets/icons/notification_active.svg';
import CartIcon from '../assets/icons/eShopCart.svg';
import AuthContext from '../auth/AuthContext';
import colors from '../config/colors';
import routes from '../navigation/routes';
import navigation from '../navigation/rootNavigation';

const HeaderActions = () => {
  const {orderedNum} = useContext(AuthContext);
  // console.log(orderedNum);
  return (
    <View style={styles.container}>
      <SearchIcon width={20} hieght={20} />
      <NoficationActiveIcon marginHorizontal={20} width={20} hieght={20} />
      <TouchableOpacity onPress={() => navigation.navigate(routes.CART)}>
        <CartIcon width={20} hieght={20}></CartIcon>
        {orderedNum > 0 && (
          <Text numberOfLines={1} style={styles.cartCount}>
            {orderedNum}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  cartCount: {
    backgroundColor: colors.red_dark,
    textAlign: 'center',
    width: 16,
    height: 16,
    fontSize: 12,
    fontWeight: '800',
    color: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    position: 'absolute',
    top: 3,
    right: -8,
  },
});

export default HeaderActions;
