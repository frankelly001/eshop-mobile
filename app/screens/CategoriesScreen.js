import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import AuthContext from '../auth/AuthContext';
import AppText from '../components/AppText';
import CategoryGroupCard from '../components/CategoryCard';
import Seperator from '../components/Seperator';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontSz, hp} from '../config/responsiveSize';

const dimenson = Dimensions.get('screen');

const CategoriesScreen = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState('Select Category');
  const {categories} = useContext(AuthContext);

  console.log(selectedCategory, 'group...........');

  // const handlePress = useCallback(category => {
  //   setSelectedCategory(categories.find(cat => cat.title === category));
  // }, []);
  const handlePress = category => {
    setSelectedCategory(categories.find(cat => cat.title === category));
  };

  return (
    <View style={styles.container}>
      <View style={styles.listofCatContainer}>
        <View style={[styles.titleContainer, styles.cats]}>
          <AppText style={styles.listofCatHeader}>Category</AppText>
        </View>
        <FlatList
          data={[...categories.map(el => el.title)]}
          showsVerticalScrollIndicator={false}
          key={category => category}
          ItemSeparatorComponent={() => <Seperator />}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                key={item}
                style={[
                  styles.catNameContainer,
                  {
                    backgroundColor:
                      item === selectedCategory.title
                        ? colors.white
                        : 'transparent',
                  },
                ]}
                onPress={() => handlePress(item)}>
                <AppText style={styles.catName}>{item}</AppText>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.catTypeContainer}>
        <View style={[styles.titleContainer, styles.catType]}>
          <AppText style={styles.titleOfCat}>
            {selectedCategory?.title ?? selectedCategory}
          </AppText>
        </View>
        {selectedCategory !== 'Select Category' &&
        Object.entries(selectedCategory).length ? (
          <FlatList
            data={selectedCategory.groups}
            style={{flex: 1}}
            showsVerticalScrollIndicator={false}
            keyExtractor={(key, i) => key?.title + i}
            renderItem={CategoryGroupCard}
          />
        ) : (
          <View style={styles.noProductCatView}>
            <AppText>
              {selectedCategory === 'Select Category'
                ? 'No Category selected'
                : 'Category not yet available'}
            </AppText>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    // paddingBottom: 60,
  },
  listofCatContainer: {
    backgroundColor: colors.grey_light,
    width: '20%', // 23
    height: '100%',
    // paddingBottom: 60,
  },
  catTypeContainer: {
    // backgroundColor: colors.purple_Transparent,
    width: '80%', // 77
    height: '100%',
    // paddingBottom: 60,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(35),
    // height: '5%',
  },
  // seperator: {
  //   width: '100%',
  //   height: hp(0.35),
  //   // backgroundColor: colors.black,
  //   backgroundColor: colors.grey_dark_3,
  // },
  cats: {
    backgroundColor: colors.grey_dark_3,
  },
  catType: {
    backgroundColor: colors.purple,
  },
  listofCatHeader: {
    color: colors.white,
    fontSize: fontSz(13),
    fontFamily: fonts.bold,
    textAlign: 'center',
    // height: '100%',
    // paddingBottom: 100,
  },
  titleOfCat: {
    textAlign: 'center',
    fontFamily: fonts.bold,
    color: colors.white,
    textTransform: 'capitalize',
  },
  catNameContainer: {
    width: '100%',
    height: hp(70),
    // backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  catName: {
    fontSize: fontSz(11), // 12
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  productCatView: {
    flex: 1,

    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductCatView: {
    width: '100%',
    flex: 1,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CategoriesScreen;
