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
}) => {
  if (index % numColumns !== 0) return null;

  const items = [];

  for (let i = index; i < index + numColumns; i++) {
    if (i >= section.data.length) {
      console.log('break');
      break;
    }
    items.push(ItemComponent(section.data[i]));
  }
  return <View style={styles.container}>{items}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
});

export default SectionListRenderItem;

// ({itm)=>decodeURI(item)
