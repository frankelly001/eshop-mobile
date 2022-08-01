import React from 'react';
import {StyleSheet, View} from 'react-native';

const ColumnList = ({
  data,
  //   index,
  keyExtractor,
  numOfColumns = 1,
  renderItem,
  contentContainerStyle,
}) => {
  const keys = [];
  return data.map((_, index) => {
    const items = [];
    if (index % numOfColumns !== 0) return null;

    for (let i = index; i < index + numOfColumns; i++) {
      if (i >= data.length) {
        console.log('break');
        break;
      }

      items.push(renderItem(data[i]));
      keys.push(data[i]);
    }
    // console.log(keys, 'keyyyy');
    return (
      <View
        key={keyExtractor(_)}
        style={[styles.container, contentContainerStyle]}>
        {items}
      </View>
    );
  });
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ColumnList;
