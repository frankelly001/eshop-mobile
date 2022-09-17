import React, {useContext} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import AuthContext from '../auth/AuthContext';
import {showToast} from '../components/AppToast/showToast';
import toast from '../components/AppToast/toast';
import FeedCard from '../components/FeedCard';
import Icon, {Icons} from '../components/Icons';
import FeedsLoader from '../components/SkeletonLoader/FeedsLoader';
import colors from '../config/colors';

const UpdateFeedsScreen = props => {
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
          <View>
            <FeedCard
              feed={item}
              onPress={() =>
                showToast(toast.types.INFO, 'This feed will be available soon')
              }
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
              }}>
              <Icon
                type={Icons.MaterialIcons}
                name="delete"
                size={35}
                color={colors.red_dark}
              />
            </TouchableOpacity>
          </View>
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

export default UpdateFeedsScreen;
