import React from 'react';
import {StyleSheet, View} from 'react-native';

const SectionListRenderItem = ({
  section,
  index,
  numColumns = 1,
  ItemComponent,
  contentContainerStyle,
}) => {
  if (index % numColumns !== 0) return null;

  const items = [];

  for (let i = index; i < index + numColumns; i++) {
    if (i >= section.data.length) {
      break;
    }
    items.push(ItemComponent(section.data[i]));
  }
  return <View style={[styles.container, contentContainerStyle]}>{items}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default SectionListRenderItem;
