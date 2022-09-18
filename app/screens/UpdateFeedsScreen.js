import React, {useContext, useState} from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import {addAllFeed} from '../api/Feed';
import {deleteFeed} from '../api/setup/deleteApi/deleteFeed';
import {
  deleteFileFromStorage,
  folderRefs,
} from '../api/setup/deleteApi/deleteFileFromStorage';
import AuthContext from '../auth/AuthContext';
import ActivityIndicator from '../components/ActivityIndicator';
import AppButton from '../components/AppButton';
import {showToast} from '../components/AppToast/showToast';
import toast from '../components/AppToast/toast';
import DeleteNotice from '../components/DeteteNotice';
import FeedCard from '../components/FeedCard';
import Icon, {Icons} from '../components/Icons';
import FeedsLoader from '../components/SkeletonLoader/FeedsLoader';
import colors from '../config/colors';
import {wp} from '../config/responsiveSize';
import {useApi} from '../hooks/useApi';
import routes from '../navigation/routes';
import {formatErrorMessage} from '../utilities/formatErrorMessage';

const UpdateFeedsScreen = ({navigation}) => {
  const {feeds, loading} = useContext(AuthContext);
  if (loading.feeds) return <FeedsLoader />;
  const {loading: deleteLoading, request} = useApi(deleteFeed);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [feedToDelete, setFeedToDelete] = useState(null);

  const handleDelete = async feed => {
    request(feed.id)
      .then(async () => {
        await deleteFileFromStorage(feed.image, folderRefs.FEED);
        showToast(toast.types.SUCCESS, 'Feed successfully deleted');
      })
      .catch(error => {
        showToast(toast.types.ERROR, formatErrorMessage(error));
      });
  };

  return (
    <>
      <ActivityIndicator visible={deleteLoading} portal />
      <FlatList
        data={feeds}
        style={{flex: 1, backgroundColor: colors.grey_light}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        key={feed => feed._id.toString()}
        renderItem={({item}) => {
          return (
            <View>
              <FeedCard
                feed={item}
                onPress={() => navigation.navigate(routes.FEEDUPDATE, item.id)}
              />
              <TouchableOpacity
                onPress={() => {
                  setFeedToDelete(item);
                  setShowDeleteModal(true);
                }}
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                }}>
                <Icon
                  type={Icons.MaterialIcons}
                  name="delete"
                  size={35}
                  color={colors.red_light}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <DeleteNotice
        visible={showDeleteModal}
        onDelete={() => {
          feedToDelete && handleDelete(feedToDelete);
          setShowDeleteModal(false);
        }}
        onCancel={() => {
          setShowDeleteModal(false);
          setFeedToDelete(null);
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(routes.ADDFEED)}
        style={{
          width: wp(45),
          height: wp(45),
          position: 'absolute',
          backgroundColor: colors.purple,
          borderRadius: wp(50 / 2),
          bottom: 20,
          right: 20,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,

          elevation: 12,
        }}>
        <Icon type={Icons.AntDesign} name="plus" color={colors.white} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
});

export default UpdateFeedsScreen;
