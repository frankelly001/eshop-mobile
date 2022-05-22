import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AuthContext from '../auth/AuthContext';
import AppText from '../components/AppText';
import ProductCard from '../components/ProductCard';
import colors from '../config/colors';
// import navigation from '../navigation/rootNavigation';
import routes from '../navigation/routes';

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
        <ScrollView>
          {allCategories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.catNameContainer,
                {
                  backgroundColor:
                    category === selectedCategory
                      ? colors.white
                      : 'transparent',
                },
              ]}
              onPress={() => setSelectedCategory(category)}>
              <AppText style={styles.catName}>{category}</AppText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.catTypeContainer}>
        <View style={[styles.titleContainer, styles.catType]}>
          <AppText style={styles.titleOfCat}>{selectedCategory}</AppText>
        </View>
        <ScrollView>
          {productCategory.length > 0 && (
            <View style={styles.productCatView}>
              {productCategory.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  small
                  onPress={() =>
                    navigation.navigate(routes.PRODUCTDETAILS, product.id)
                  }
                />
              ))}
            </View>
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
        </ScrollView>
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
    width: '25%',
    height: '100%',
  },
  catTypeContainer: {
    // backgroundColor: colors.purple_Transparent,
    width: '75%',
    height: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
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
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  titleOfCat: {
    textAlign: 'center',
    fontWeight: '700',
    color: colors.white,
    textTransform: 'capitalize',
  },
  catNameContainer: {
    width: '100%',
    height: 70,
    // backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  catName: {
    fontSize: 13,
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
    height: 0.815 * dimenson.height,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CategoriesScreen;
