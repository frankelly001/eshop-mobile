import React, {useContext, useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
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
import Octicons from 'react-native-vector-icons/Octicons';
import Animated from 'react-native-reanimated';
import AppTextInput from './AppTextInput';
import useAnimatedHeaderStyles from '../hooks/useAnimatedHeaderStyles';
import fonts from '../config/fonts';
import {authStorageKeys, storeUserData} from '../api/storage/authStorage';
import queryApi from '../api/setup/queryApi/queryApi';

const Header = ({navigation, options, route}) => {
  const {orderedNum, recentQueries, setRecentQueries} = useContext(AuthContext);
  const [disableBackBtn, setDisableBackBtn] = useState(false);
  const [disableSearchBtn, setDisableSearchBtn] = useState(false);
  const [disableNotifyBtn, setDisableNotifyBtn] = useState(false);
  const [disableCartBtn, setDisableCartBtn] = useState(false);
  const [disableHeaderRight, setDisableHeaderRight] = useState(false);
  const [backIcon, setBackIcon] = useState('arrow-left');
  const [searchToggle, setSearchToggle] = useState(false);
  const [query, setQuery] = useState('');

  const inputRef = useRef();
  const size = wp(20);

  const {
    headerLeftAnimatedStyle,
    headerRightAnimatedStyle,
    inputContainerAnimatedStyle,
    recentSearchContainerAnimatedStyle,
    seachBtnContainerAnimatedStyle,
  } = useAnimatedHeaderStyles(searchToggle, inputRef);

  useEffect(() => {
    const backBtnConditions = [
      routes.HOME,
      routes.CATEGORIES,
      routes.FEED,
      routes.ACCOUNT,
      routes.HELP,
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
      setBackIcon('close');
    }
  }, [route.name]);

  // console.log(recentQueries, 'recent');

  const handleSearch = recentQuery => {
    setSearchToggle(!searchToggle);
    const newQuery = recentQuery ? recentQuery : query;
    let results;
    if (searchToggle && newQuery) {
      // if (!recentQuery)
      results = [
        newQuery,
        ...recentQueries.filter(el => el !== newQuery),
      ].slice(0, 10);
      storeUserData(authStorageKeys.RECENT_QUERIES, results);
      setRecentQueries(results);
      // console.log(results, 'kkkkkklop');
      navigation.navigate(routes.SEARCHED, {
        query: newQuery,
        searchType: 'AllFieldsSearch',
      });
      setQuery('');
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View
          style={[
            styles.headerLeft,
            {
              flex: 1,
              // overflow: 'hidden',
              // backgroundColor: 'red',
              paddingRight: 20,
            },
          ]}>
          {(!disableBackBtn || searchToggle) && (
            <TouchableHighlight
              // hitSlop={{top: 20, bottom: 20, right: 20, left: 20}}
              onPress={() =>
                searchToggle
                  ? setSearchToggle(!searchToggle)
                  : navigation.goBack()
              }
              underlayColor={colors.grey_light_4}
              style={styles.backBtn}>
              <MaterialCommunityIcons
                size={size}
                color={colors.black}
                name={backIcon}
              />
            </TouchableHighlight>
          )}
          <Animated.View style={headerLeftAnimatedStyle}>
            <AppText
              numberOfLines={1}
              style={[
                styles.title,
                options.title !== 'eShop' && {textTransform: 'capitalize'},
              ]}>
              {options.title ? options.title : route.name}
            </AppText>
          </Animated.View>
        </View>

        <Animated.View style={inputContainerAnimatedStyle}>
          <AppTextInput
            style={[styles.searchInputField]}
            value={query}
            onChangeText={text => setQuery(text)}
            inputRef={inputRef}
            // autoFocus={searchToggle}
            placeholder="Search eShop"
          />
        </Animated.View>

        <Animated.View style={[headerRightAnimatedStyle]}>
          {!disableHeaderRight && (
            <View style={styles.headerRight}>
              {!disableSearchBtn && (
                <TouchableOpacity onPress={() => handleSearch()}>
                  <Animated.View style={seachBtnContainerAnimatedStyle}>
                    <SearchIcon
                      width={size}
                      stroke={searchToggle ? colors.white : colors.black}
                    />
                  </Animated.View>
                </TouchableOpacity>
              )}
              {!disableNotifyBtn && (
                <TouchableOpacity>
                  <NoficationActiveIcon marginHorizontal={size} width={size} />
                </TouchableOpacity>
              )}
              {!disableCartBtn && (
                <TouchableOpacity
                  // style={{backgroundColor: 'yellow'}}
                  onPress={() => navigation.navigate(routes.CART)}>
                  <CartIcon width={size}></CartIcon>
                  {orderedNum > 0 && (
                    <Text numberOfLines={1} style={styles.cartCount}>
                      {orderedNum}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          )}
        </Animated.View>
      </View>
      <Animated.View style={recentSearchContainerAnimatedStyle}>
        <AppText
          style={{
            fontSize: fontSz(12),
            // fontWeight: '700',
            fontFamily: fonts.bold,
            backgroundColor: colors.grey_light_4,
            padding: 5,
            paddingHorizontal: 15,
          }}>
          Recents Search
        </AppText>
        <ScrollView>
          {recentQueries.map(el => (
            <TouchableOpacity
              key={el}
              onPress={() => handleSearch(el)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // backgroundColor: 'red',
                padding: 5,
                marginVertical: 2,
                paddingHorizontal: 15,
              }}>
              <Octicons
                size={size - 5}
                name="search"
                style={{marginRight: 5}}
              />
              <AppText
                style={{fontSize: fontSz(13), fontFamily: fonts.semi_bold}}>
                {el}
              </AppText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </>
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
    overflow: 'hidden',
    // backgroundColor: 'yellow',
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
    // fontWeight: '700',
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
    fontFamily: fonts.bold,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    marginRight: 3,
    marginLeft: -10,
    width: wp(35),
    height: wp(35),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    zIndex: 999,
  },
  contentInner: {
    flex: 1,
    paddingTop: 50,
  },
  separator: {
    marginTop: 5,
    height: 1,
    backgroundColor: colors.black,
  },
  searchInputField: {
    borderRadius: 0,
    width: '100%',
    paddingHorizontal: 0,
  },
});

export default Header;
