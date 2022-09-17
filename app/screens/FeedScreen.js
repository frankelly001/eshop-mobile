import React, {useContext} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import AuthContext from '../auth/AuthContext';
import {showToast} from '../components/AppToast/showToast';
import toast from '../components/AppToast/toast';
import FeedCard from '../components/FeedCard';
import FeedsLoader from '../components/SkeletonLoader/FeedsLoader';
import colors from '../config/colors';

const FeedScreen = props => {
  const {feeds, loading} = useContext(AuthContext);
  if (loading.feeds) return <FeedsLoader />;
  return (
    <FlatList
      data={feeds}
      style={{flex: 1}}
      showsVerticalScrollIndicator={false}
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
