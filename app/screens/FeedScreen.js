import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {getFeed} from '../api/Feed';
import FeedCard from '../components/FeedCard';
import colors from '../config/colors';

const FeedScreen = props => {
  return (
    // <View style={styles.container}>
    //   {getFeed().map(feed => (
    //     <FeedCard key={feed._id} feed={feed} />
    //   ))}
    // </View>
    <FlatList
      data={getFeed()}
      style={{flex: 1}}
      contentContainerStyle={styles.container}
      key={feed => feed._id.toString()}
      renderItem={({item}) => {
        return <FeedCard feed={item} />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 70,

    backgroundColor: colors.grey_light,
  },
});

export default FeedScreen;
