import React, {useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import SearchIcon from '../assets/icons/search.svg';
import NoficationActiveIcon from '../assets/icons/notification_active.svg';
import CartIcon from '../assets/icons/eShopCart.svg';
import AuthContext from '../auth/AuthContext';
import colors from '../config/colors';
import routes from '../navigation/routes';
// import navigation from '../navigation/rootNavigation';
import {wp, fontSz} from '../config/responsiveSize';
import AppText from './AppText';
import MaterialIcons from 'react-native-vector-icons/Ionicons';

const Header = ({navigation}) => {
  const {orderedNum} = useContext(AuthContext);
  const size = wp(20);

  return (
    <View style={styles.container}>
      <View style={styles.headerLeft}>
        <TouchableHighlight
          // hitSlop={{top: 20, bottom: 20, right: 20, left: 20}}
          onPress={() => navigation.goBack()}
          underlayColor={colors.grey_light_4}
          style={styles.backBtn}>
          <MaterialIcons size={size} color={colors.black} name="arrow-back" />
        </TouchableHighlight>
        <AppText style={styles.title}>Details</AppText>
      </View>
      <View style={styles.headerRight}>
        <SearchIcon width={size} hieght={size} />
        <NoficationActiveIcon
          marginHorizontal={size}
          width={size}
          hieght={size}
        />
        <TouchableOpacity onPress={() => navigation.navigate(routes.CART)}>
          <CartIcon width={size} hieght={size}></CartIcon>
          {orderedNum > 0 && (
            <Text numberOfLines={1} style={styles.cartCount}>
              {orderedNum}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.grey_light,
    paddingHorizontal: 15,
    height: 50,
  },
  headerRight: {
    flexDirection: 'row',
  },
  cartCount: {
    backgroundColor: colors.purple,
    textAlign: 'center',
    width: wp(16),
    height: wp(16),
    fontSize: fontSz(12),
    fontWeight: '700',
    color: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    position: 'absolute',
    top: 3,
    right: -8,
  },
  title: {
    fontSize: fontSz(20),
    fontWeight: '600',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    marginRight: 5,
    width: wp(35),
    height: wp(35),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
