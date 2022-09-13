import React, {useContext, useCallback, memo} from 'react';
import {View, SectionList} from 'react-native';
import AuthContext from '../auth/AuthContext';
import AppText from '../components/AppText';
import HomeLoader from '../components/SkeletonLoader/HomeLoader';
import ImageCarousel from '../components/ImageCarousel';
import ProductCard from '../components/ProductCard';
import SectionListRenderItem from '../components/SectionListRenderItem';
import colors from '../config/colors';
import routes from '../navigation/routes';
import {formatData} from '../utilities/formatData';
import RetryView from '../components/RetryView';
import StickyHomeSectionHeader from '../components/StickyHomeSectionHeader';

const HomeScreen = ({navigation}) => {
  const {products, categories, loading, errors, addToCart} =
    useContext(AuthContext);

  const numOfCols = 2;
  // console.log(newProducts, 'new..................');
  // console.log(errors.products, 'products error');

  if (loading.products || loading.categories) return <HomeLoader />;

  return (
    <>
      {products.length && !errors.products ? (
        <SectionList
          contentContainerStyle={{paddingBottom: 10}}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <ImageCarousel categories={[...categories.map(el => el.title)]} />
          )}
          renderSectionHeader={() => (
            // <View
            //   style={{
            //     backgroundColor: colors.grey_light_4,
            //     width: '100%',
            //     height: 40,
            //     justifyContent: 'center',
            //     paddingHorizontal: 10,
            //   }}>
            //   <AppText>New Arrivals</AppText>
            // </View>
            <StickyHomeSectionHeader
              categories={[
                ...categories.map(el => {
                  return {title: el.title, img: el.img};
                }),
              ]}
            />
          )}
          sections={[{data: formatData(products, numOfCols)}]}
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
                    btnOnPress={() => addToCart(item.id)}
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
      ) : (
        <RetryView />
      )}
    </>
  );
};

export default HomeScreen;
