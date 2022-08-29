import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {getFeed} from '../api/Feed';
import {showToast} from '../components/AppToast/showToast';
import toast from '../components/AppToast/toast';
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
        return (
          <FeedCard
            feed={item}
            onPress={() =>
              showToast(toast.types.INFO, 'This feed will be available soon')
            }
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 10,

    backgroundColor: colors.grey_light,
  },
});

export default FeedScreen;
