import React, {useContext, useRef} from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import AuthContext from '../auth/AuthContext';
import ProductCard from '../components/ProductCard';
import Screen from '../components/Screen';
import routes from '../navigation/routes';
import {formatData} from '../utilities/formatData';

const HomeScreen = ({navigation}) => {
  const {products} = useContext(AuthContext);

  return (
    <FlatList
      numColumns={2}
      data={formatData(products, 2)}
      style={{flex: 1}}
      // contentContainerStyle={styles.container}
      key={product => product.id.toString()}
      renderItem={({item}) => {
        if (item.empty)
          return <View style={{flex: 1, backgroundColor: 'red'}}></View>;
        return (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate(routes.PRODUCTDETAILS, item.id)}
          />
        );
      }}
    />
  );
};

// return (
//   <Screen>
//     <View style={styles.container}>
//       {/* <Text>here's Home</Text> */}
//       {/* <FlatList
//         data={products}
//         key={product => product.id.toString()}
//         renderItem={({item}) => <ProductCard product={item} />}
//       /> */}
//       {products.map(product => (
//         <ProductCard
//           key={product.id}
//           product={product}
//           onPress={() =>
//             navigation.navigate(routes.PRODUCTDETAILS, product.id)
//           }
//         />
//       ))}
//     </View>
//   </Screen>
// );

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // alignContent: 'center',
    // flexWrap: 'wrap',
    padding: 2,
    backgroundColor: 'red',
  },
});

export default HomeScreen;
