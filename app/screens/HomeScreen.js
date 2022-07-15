import React, {useContext, useCallback, memo} from 'react';
import {StyleSheet, View, Text, FlatList, SectionList} from 'react-native';
import AuthContext from '../auth/AuthContext';
import AppText from '../components/AppText';
import ImageCarousel from '../components/ImageCarousel';
import NewSection from '../components/NewSection';
import ProductCard from '../components/ProductCard';
import SectionListRenderItem from '../components/SectionListRenderItem';
import colors from '../config/colors';
import routes from '../navigation/routes';
import {formatData} from '../utilities/formatData';

const HomeScreen = ({navigation}) => {
  const {products, newProducts} = useContext(AuthContext);

  // const navigate = useCallback(id => {
  //   navigation.navigate(routes.PRODUCTDETAILS, id);
  // }, []);

  // console.log(newProducts[0], 'new Products............');

  const numOfCols = 2;
  if (newProducts.length < 1) return null;
  // if (1) return null;

  return (
    <SectionList
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => <ImageCarousel />}
      renderSectionHeader={() => (
        <View
          style={{
            backgroundColor: colors.grey_light_4,
            width: '100%',
            height: 40,
            justifyContent: 'center',
            paddingHorizontal: 10,
          }}>
          <AppText>New Arrivals</AppText>
        </View>
      )}
      sections={[{data: formatData(newProducts, numOfCols)}]}
      stickySectionHeadersEnabled
      renderItem={({...props}) => (
        <SectionListRenderItem
          contentContainerStyle={{padding: 2}}
          numColumns={numOfCols}
          ItemComponent={item => {
            if (item.empty)
              return (
                <View
                  key={item.id}
                  style={{flex: 1, backgroundColor: 'transparent'}}
                />
              );
            return (
              <ProductCard
                product={item}
                key={item.id}
                onPress={() =>
                  navigation.navigate(routes.PRODUCTDETAILS, item.id)
                }
              />
            );
          }}
          {...props}
        />
      )}
    />
  );
};

export default HomeScreen;
