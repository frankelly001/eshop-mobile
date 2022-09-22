import React, {useContext, useState} from 'react';
import {StyleSheet, View, SectionList} from 'react-native';
import AuthContext from '../auth/AuthContext';
import {formatData} from '../utilities/formatData';
import AppText from './AppText';
import ImageCarousel from './ImageCarousel';
import ProductCard from './ProductCard';
import SectionListRenderItem from './SectionListRenderItem';

const RenderItem = ({section, index, numColumns = 1}) => {
  if (index % numColumns !== 0) return null;

  const items = [];

  const allItems = formatData(section.data, numColumns);

  for (let i = index; i < index + numColumns; i++) {
    if (i >= section.data.length) {
      break;
    }

    allItems[i].empty
      ? items.push(
          <View
            key={allItems[i].id}
            style={{flex: 1, backgroundColor: 'red', width: '100%'}}
          />,
        )
      : items.push(<ProductCard key={allItems[i].id} product={allItems[i]} />);
  }

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

  return null;
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
