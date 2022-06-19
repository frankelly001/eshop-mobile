import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import AuthContext from '../auth/AuthContext';
import AppText from '../components/AppText';
import ProductCard from '../components/ProductCard';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontSz, hp} from '../config/responsiveSize';
// import navigation from '../navigation/rootNavigation';
import routes from '../navigation/routes';
import {formatData} from '../utilities/formatData';

const dimenson = Dimensions.get('screen');

const CategoriesScreen = ({navigation}) => {
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Select Category');
  const {categories, products} = useContext(AuthContext);

  const productCategory = products.filter(
    product => product.category === selectedCategory,
  );

  // console.log(productCategory);

  useEffect(() => {
    setAllCategories([
      ...categories,
      'Phones & Tablets',
      'Computing',
      'Fashion',
      'Automobiles',
      'Home & office',
      'Supermarket',
      'Baby Products',
      'Health & Beauty',
      'Sporting goods',
      'Other Cateories',
    ]);
  }, []);
  // console.log(allCategories);
  return (
    <View style={styles.container}>
      <View style={styles.listofCatContainer}>
        <View style={[styles.titleContainer, styles.cats]}>
          <AppText style={styles.listofCatHeader}>Categories</AppText>
        </View>
        <FlatList
          data={allCategories}
          showsVerticalScrollIndicator={false}
          key={category => category}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                key={item}
                style={[
                  styles.catNameContainer,
                  {
                    backgroundColor:
                      item === selectedCategory ? colors.white : 'transparent',
                  },
                ]}
                onPress={() => setSelectedCategory(item)}>
                <AppText style={styles.catName}>{item}</AppText>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.catTypeContainer}>
        <View style={[styles.titleContainer, styles.catType]}>
          <AppText style={styles.titleOfCat}>{selectedCategory}</AppText>
        </View>
        {productCategory.length > 0 && (
          <FlatList
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={formatData(productCategory, 2)}
            // style={{flex: 1}}
            // contentContainerStyle={styles.container}
            key={product => product.id.toString()}
            renderItem={({item}) => {
              if (item.empty)
                return <View style={{flex: 1, backgroundColor: 'red'}}></View>;
              return (
                <ProductCard
                  product={item}
                  onPress={() =>
                    navigation.navigate(routes.PRODUCTDETAILS, item.id)
                  }
                  medium
                />
              );
            }}
          />
        )}
        {productCategory.length < 1 && (
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
  },
  listofCatContainer: {
    backgroundColor: colors.grey_light,
    width: '23%',
    height: '100%',
  },
  catTypeContainer: {
    // backgroundColor: colors.purple_Transparent,
    width: '77%',
    height: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp(35),
    // height: '5%',
  },
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
    fontSize: fontSz(12),
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CategoriesScreen;
