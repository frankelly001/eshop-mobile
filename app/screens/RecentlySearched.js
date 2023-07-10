import React, {useContext, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {searchType} from '../api/setup/queryApi/queryApi';
import AuthContext from '../auth/AuthContext';
import AppText from '../components/AppText';
import DeleteNotice from '../components/DeteteNotice';
import Icon, {Icons} from '../components/Icons';
import Screen from '../components/Screen';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontSz, wp} from '../config/responsiveSize';
import routes from '../navigation/routes';

const RecentlySearched = ({navigation}) => {
  const {recentQueries, clearRecentQuery} = useContext(AuthContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <>
      {recentQueries.length ? (
        <>
          <Screen>
            {recentQueries.map(query => (
              <TouchableOpacity
                key={query}
                onPress={() =>
                  navigation.navigate(routes.SEARCHED, {
                    query,
                    searchType: searchType.AllFIELDSEARCH,
                  })
                }
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // backgroundColor: 'red',
                  padding: 8,
                  marginVertical: 2,
                  paddingHorizontal: 15,
                }}>
                {/* <Octicons size={size - 5} name="search" style={{marginRight: 5}} /> */}
                <Icon
                  type={Icons.Octicons}
                  size={10}
                  name="search"
                  style={{marginRight: 5}}
                />
                <AppText style={{fontFamily: fonts.semi_bold}}>{query}</AppText>
              </TouchableOpacity>
            ))}
          </Screen>
          <TouchableOpacity
            onPress={() => setShowDeleteModal(true)}
            style={{
              position: 'absolute',
              backgroundColor: colors.grey_dark,
              width: '100%',
              alignItems: 'center',
              padding: 15,
              bottom: 0,
            }}>
            <AppText style={{color: colors.white}}>Clear All</AppText>
          </TouchableOpacity>
          <DeleteNotice
            visible={showDeleteModal}
            onDelete={clearRecentQuery}
            onCancel={() => setShowDeleteModal(false)}
            noticeLabel="Are you sure you want to clear all recently searched?"
          />
        </>
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
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: fonts.semi_bold,
  },
  subText: {
    marginBottom: 100,
    textAlign: 'center',
  },
});

export default RecentlySearched;
