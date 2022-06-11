import React, {useContext, useState} from 'react';
import {StyleSheet, View, SectionList} from 'react-native';
import AuthContext from '../auth/AuthContext';
import {formatData} from '../utilities/formatData';
import AppText from './AppText';
import ImageCarousel from './ImageCarousel';
import ProductCard from './ProductCard';
import SectionListRenderItem from './SectionListRenderItem';

const RenderItem = ({section, index, numColumns = 1}) => {
  // const numColumns = 2;

  if (index % numColumns !== 0) return null;

  const items = [];

  // if (item.empty)
  //    return (
  //     <View style={{flex: 1, backgroundColor: 'red', width: '100%'}} />
  //     );

  const allItems = formatData(section.data, numColumns);
  // console.log(allItems);
  for (let i = index; i < index + numColumns; i++) {
    if (i >= section.data.length) {
      console.log('break');
      break;
    }

    allItems[i].empty
      ? items.push(
          <View
            key={allItems[i].id}
            style={{flex: 1, backgroundColor: 'red', width: '100%'}}
          />,
        )
      : items.push(
          <ProductCard
            key={allItems[i].id}
            product={allItems[i]}
            // onPress={() => navigation.navigate(routes.PRODUCTDETAILS, item.id)}
          />,
        );
  }

  // console.log(items);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'yellow',
      }}>
      {items}
    </View>
  );
};

const SectionComponent = props => {
  const {products} = useContext(AuthContext);

  return (
    <SectionList
      //   ItemSeparatorComponent={() => <ItemSeparator />}
      ListHeaderComponent={() => <ImageCarousel />}
      renderItem={({...props}) => (
        <SectionListRenderItem
          numColumns={2}
          ItemComponent={ProductCard}
          {...props}
        />
      )}
      // renderItem={RenderItem}
      renderSectionHeader={() => (
        <View style={{backgroundColor: 'red', width: '100%', height: 50}}>
          <AppText>heyyy</AppText>
        </View>
      )}
      sections={[{data: products}]}
      stickySectionHeadersEnabled={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default SectionComponent;

// import React, {useContext, useCallback, memo} from 'react';
// import {StyleSheet, View, Text, FlatList} from 'react-native';
// import AuthContext from '../auth/AuthContext';
// import AppText from '../components/AppText';
// import ImageCarousel from '../components/ImageCarousel';
// import ProductCard from '../components/ProductCard';
// import SectionComponent from '../components/SectionComponent';
// import routes from '../navigation/routes';
// import {formatData} from '../utilities/formatData';

// const HomeScreen = ({navigation}) => {
//   const {products} = useContext(AuthContext);

//   // const navigate = useCallback(id => {
//   //   navigation.navigate(routes.PRODUCTDETAILS, id);
//   // }, []);

//   // console.log('Home Screen rendering');

//   if (products.length > 0) return <SectionComponent />;

//   return (
//     <FlatList
//       ListHeaderComponent={ImageCarousel}
//       // stickyHeaderIndices={[0]}
//       // // stickyHeaderHiddenOnScroll
//       // StickyHeaderComponent={() => (
//       // <View style={{backgroundColor: 'red', width: '100%', height: 50}}>
//       //   <AppText>heyyy</AppText>
//       // </View>
//       // )}
//       ListHeaderComponentStyle={{marginBottom: 10}}
//       showsVerticalScrollIndicator={false}
//       numColumns={2}
//       data={formatData(products, 2)}
//       // style={{flex: 1}}
//       // contentContainerStyle={styles.container}
//       key={product => product.id.toString()}
//       renderItem={({item}) => {
//         if (item.empty)
//           return <View style={{flex: 1, backgroundColor: 'red'}} />;
//         return (
//           <ProductCard
//             product={item}
//             // onPress={() => navigate(item.id)}
//             onPress={() => navigation.navigate(routes.PRODUCTDETAILS, item.id)}
//           />
//         );
//       }}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
// });

// export default HomeScreen;
