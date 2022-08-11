import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Pressable,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontSz, hp, wp} from '../config/responsiveSize';
import AppText from './AppText';
import navigation from '../navigation/rootNavigation';
import routes from '../navigation/routes';

const img =
  'https://images.unsplash.com/photo-1580910051074-3eb694886505?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8cGhvbmV8fHx8fHwxNjU4NDkzODI1&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080';

const groupCard = ({item}) => (
  <TouchableOpacity
    key={item}
    style={styles.groupTypeContainer}
    onPress={() =>
      navigation.navigate(routes.SEARCHED, {
        query: item,
        searchType: 'categoryFieldSearch',
        searchField: 'CATEGORY_GROUP_TYPE',
      })
    }>
    <View style={styles.imageContainer}>
      <Image style={styles.image} resizeMode="stretch" source={{uri: img}} />
    </View>
    <AppText numberOfLines={1} style={styles.typeTitle}>
      {item}
    </AppText>
  </TouchableOpacity>
);

const CategoryGroupCard = ({item}) => {
  // console.log(item, 'kkkkkkkkkk');
  return (
    <View key={item.title} style={styles.container}>
      <View style={styles.titleContainer}>
        <AppText style={styles.title}>{item.title}</AppText>
        <Pressable
          onPress={() =>
            navigation.navigate(routes.SEARCHED, {
              query: item.title,
              searchType: 'categoryFieldSearch',
              searchField: 'CATEGORY_GROUP',
            })
          }>
          <AppText style={styles.clickable}>See all</AppText>
        </Pressable>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={item.types}
        keyExtractor={key => key}
        renderItem={groupCard}
        contentContainerStyle={styles.contentContainer}
      />

      {/* <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
        {item.types.map(groupCard)}
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.grey_dark_2_tranparent,
    margin: 5,
  },
  titleContainer: {
    backgroundColor: colors.grey_light_4,
    height: hp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  title: {
    // fontSize: fontSz(12),
    fontSize: fontSz(8),
    textTransform: 'uppercase',
  },
  clickable: {
    // fontSize: fontSz(13),
    fontSize: fontSz(10),
    fontFamily: fonts.bold,
  },
  contentContainer: {
    // height: hp(100),
    alignItems: 'center',
    backgroundColor: colors.grey_light,
  },
  typeTitle: {
    // fontSize: fontSz(10),
    fontSize: fontSz(7),
    textAlign: 'center',
    padding: 2,
    fontFamily: fonts.semi_bold,
    textTransform: 'capitalize',
    // backgroundColor: 'red',
  },
  groupTypeContainer: {
    margin: 3,
    backgroundColor: colors.white,
    width: wp(75),
    // flex: 1,
    // height: '100%',
  },
  imageContainer: {
    width: wp(75),
    height: wp(75),
    // flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CategoryGroupCard;
