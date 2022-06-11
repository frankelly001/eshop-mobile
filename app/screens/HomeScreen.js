import React, {useContext, useCallback, memo} from 'react';
import {StyleSheet, View, Text, FlatList, SectionList} from 'react-native';
import AuthContext from '../auth/AuthContext';
import AppText from '../components/AppText';
import ImageCarousel from '../components/ImageCarousel';
import ProductCard from '../components/ProductCard';
import SectionComponent from '../components/SectionComponent';
import SectionListRenderItem from '../components/SectionListRenderItem';
import routes from '../navigation/routes';
import {formatData} from '../utilities/formatData';

const HomeScreen = ({navigation}) => {
  const {products} = useContext(AuthContext);

  // const navigate = useCallback(id => {
  //   navigation.navigate(routes.PRODUCTDETAILS, id);
  // }, []);

  // console.log('Home Screen rendering');

  // if (products.length > 0) return <SectionComponent />;

  return (
    <SectionList
      ListHeaderComponent={() => <ImageCarousel />}
      renderItem={({item, ...props}) => (
        <SectionListRenderItem
          numColumns={2}
          ItemComponent={ProductCard}
          navigation={navigation}
          item={item}
          {...props}
        />
      )}
      renderSectionHeader={() => (
        <View style={{backgroundColor: 'red', width: '100%', height: 40}}>
          <AppText>heyyy</AppText>
        </View>
      )}
      sections={[{data: products}]}
      stickySectionHeadersEnabled={true}
    />
  );
};

export default HomeScreen;
