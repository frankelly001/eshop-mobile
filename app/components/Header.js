import React, {useContext, useState, useEffect} from 'react';
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
import {wp, fontSz, hp} from '../config/responsiveSize';
import AppText from './AppText';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = ({
  navigation,
  options,
  route,
  // backIcon = 'arrow-left',
  // disableBackBtn,
  // disableSearchBtn,
  // disableNotifyBtn,
  // disableCartBtn,
  // disableHeaderRight,
}) => {
  const {orderedNum} = useContext(AuthContext);
  const size = wp(20);
  const [disableBackBtn, setDisableBackBtn] = useState(false);
  const [disableSearchBtn, setDisableSearchBtn] = useState(false);
  const [disableNotifyBtn, setDisableNotifyBtn] = useState(false);
  const [disableCartBtn, setDisableCartBtn] = useState(false);
  const [disableHeaderRight, setDisableHeaderRight] = useState(false);
  const [backIcon, setBackIcon] = useState('arrow-left');

  useEffect(() => {
    const backBtnConditions = [
      routes.HOME,
      routes.CATEGORIES,
      routes.FEED,
      routes.ACCOUNT,
      routes.HELP,
      routes.SIGNUP,
    ];

    const headerRightConditions = [
      routes.ACCOUNT,
      routes.SIGNUP,
      routes.LOGIN,
      routes.HELP,
      routes.CART,
      routes.CHECKOUT,
    ];

    if (backBtnConditions.includes(route.name)) setDisableBackBtn(true);
    if (headerRightConditions.includes(route.name)) {
      setDisableHeaderRight(true);
    }

    if (route.name === routes.CART) {
      // setDisableHeaderRight(true);
      setBackIcon('close');
    }
  }, [route.name]);

  return (
    <View style={styles.container}>
      <View style={styles.headerLeft}>
        {!disableBackBtn && (
          <TouchableHighlight
            // hitSlop={{top: 20, bottom: 20, right: 20, left: 20}}
            onPress={() => navigation.goBack()}
            underlayColor={colors.grey_light_4}
            style={styles.backBtn}>
            <MaterialCommunityIcons
              size={size}
              color={colors.black}
              name={backIcon}
            />
          </TouchableHighlight>
        )}
        <AppText style={styles.title}>
          {options.title ? options.title : route.name}
        </AppText>
      </View>
      {!disableHeaderRight && (
        <View style={styles.headerRight}>
          {!disableSearchBtn && (
            <TouchableOpacity>
              <SearchIcon width={size} hieght={size} />
            </TouchableOpacity>
          )}
          {!disableNotifyBtn && (
            <TouchableOpacity>
              <NoficationActiveIcon
                marginHorizontal={size}
                width={size}
                hieght={size}
              />
            </TouchableOpacity>
          )}
          {!disableCartBtn && (
            <TouchableOpacity
              // style={{backgroundColor: 'yellow'}}
              onPress={() => navigation.navigate(routes.CART)}>
              <CartIcon width={size} hieght={size}></CartIcon>
              {orderedNum > 0 && (
                <Text numberOfLines={1} style={styles.cartCount}>
                  {orderedNum}
                </Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      )}
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
    // backgroundColor: 'red',
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
    top: hp(3),
    right: -8,
  },
  title: {
    fontSize: fontSz(20),
    fontWeight: '700',
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
