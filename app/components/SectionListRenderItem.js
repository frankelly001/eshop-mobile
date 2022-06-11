import React from 'react';
import {StyleSheet, View} from 'react-native';
import routes from '../navigation/routes';
import {formatData} from '../utilities/formatData';
import ProductCard from './ProductCard';

const SectionListRenderItem = ({
  section,
  index,
  numColumns = 1,
  ItemComponent,
  navigation,
  item,
}) => {
  if (index % numColumns !== 0) return null;

  const items = [];
  //   console.log(item);

  const allItems = formatData(section.data, numColumns);
  console.log(allItems);

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
          <ItemComponent
            key={allItems[i].id}
            product={allItems[i]}
            onPress={() =>
              navigation.navigate(routes.PRODUCTDETAILS, allItems[i].id)
            }
          />,
        );
  }

  // console.log(items);
  return <View style={styles.container}>{items}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'yellow',
  },
});

export default SectionListRenderItem;
