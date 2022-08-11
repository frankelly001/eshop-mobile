import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AuthContext from '../auth/AuthContext';
import AppText from '../components/AppText';
import Icon, {Icons} from '../components/Icons';
import Screen from '../components/Screen';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontSz, wp} from '../config/responsiveSize';
import routes from '../navigation/routes';

const RecentlySearched = ({navigation}) => {
  const {recentQueries} = useContext(AuthContext);
  return (
    <>
      {recentQueries.length ? (
        <Screen>
          {recentQueries.map(query => (
            <TouchableOpacity
              key={query}
              onPress={() =>
                navigation.navigate(routes.SEARCHED, {
                  query,
                  searchType: 'AllFieldsSearch',
                })
              }
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // backgroundColor: 'red',
                padding: 5,
                marginVertical: 2,
                paddingHorizontal: 15,
              }}>
              {/* <Octicons size={size - 5} name="search" style={{marginRight: 5}} /> */}
              <Icon
                type={Icons.Octicons}
                size={wp(20) - 10}
                name="search"
                style={{marginRight: 5}}
              />
              <AppText
                style={{fontSize: fontSz(10), fontFamily: fonts.semi_bold}}>
                {query}
              </AppText>
            </TouchableOpacity>
          ))}
        </Screen>
      ) : (
        <View style={styles.container}>
          <AppText style={styles.text}>No item recently searched</AppText>
          <AppText style={styles.subText}>
            You haven't searched any item since you logged in.
          </AppText>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: fonts.semi_bold,
  },
  subText: {
    marginBottom: 100,
  },
});

export default RecentlySearched;
