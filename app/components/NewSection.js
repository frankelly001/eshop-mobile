import React from 'react';
import {StyleSheet, View} from 'react-native';
import routes from '../navigation/routes';
import {formatData} from '../utilities/formatData';
import ProductCard from './ProductCard';

const NewSection = ({section, index, numColumns = 1, ItemComponent}) => {
  if (index % numColumns !== 0) return null;

  const items = [];

  // const allItems = formatData(section.data, numColumns);

  for (let i = index; i < index + numColumns; i++) {
    if (i >= section.data.length) {
      console.log('break');
      break;
    }
    items.push(ItemComponent({item: section.data[i]}));
    // OR
    // items.push(ItemComponent(section.data[i]));

    // allItems[i].empty
    //   ? items.push(
    //       <View
    //         key={allItems[i].id}
    //         style={{flex: 1, backgroundColor: 'red', width: '100%'}}
    //       />,
    //     )
    //   : items.push(
    //       <ItemComponent
    //         key={allItems[i].id}
    //         product={allItems[i]}
    //         onPress={() =>
    //           navigation.navigate(routes.PRODUCTDETAILS, allItems[i].id)
    //         }
    //       />,
    //     );
  }
  // if (1) return null;
  return <View style={styles.container}>{items}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'yellow',
  },
});

export default NewSection;

// const Arr_s = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

// // for (let i = index; i < index + numColumns; i++) {
// // }

// Arr_s.map((el, index) => {
//   let items = [];

//   const numOfColumns = 2;
//   if (index % numOfColumns !== 0) return;

//   for (let i = index; i < index + numOfColumns; i++) {
//     //      if (i >= Arr_s.length) {
//     //       break;
//     //       }
//     items.push(Arr_s[i]);
//   }
//   console.log(items);
// });
