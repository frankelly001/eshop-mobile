import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {addAllFeed} from '../api/Feed';
import {deleteCarousel} from '../api/setup/deleteApi/deleteCarousel';
import {deleteFeed} from '../api/setup/deleteApi/deleteFeed';
import {
  deleteFileFromStorage,
  folderRefs,
} from '../api/setup/deleteApi/deleteFileFromStorage';
import AuthContext from '../auth/AuthContext';
import ActivityIndicator from '../components/ActivityIndicator';
import AppButton from '../components/AppButton';
import AppGradientText from '../components/AppGradientText';
import AppText from '../components/AppText';
import {showToast} from '../components/AppToast/showToast';
import toast from '../components/AppToast/toast';
import DeleteNotice from '../components/DeteteNotice';
import FeedCard from '../components/FeedCard';
import Icon, {Icons} from '../components/Icons';
import FeedsLoader from '../components/SkeletonLoader/FeedsLoader';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontSz, wp} from '../config/responsiveSize';
import {useApi} from '../hooks/useApi';
import routes from '../navigation/routes';
import {formatErrorMessage} from '../utilities/formatErrorMessage';

const dimensions = Dimensions.get('screen');

const CarouselCard = ({carousel, onPress}) => {
  return (
    <TouchableOpacity style={styles.feedContent} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="stretch"
          style={styles.image}
          source={{uri: carousel.image}}
        />
      </View>

      <AppGradientText numberOfLines={1} style={styles.title}>
        {carousel.title}
      </AppGradientText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  feedContent: {
    alignItems: 'center',
    height: dimensions.height * 0.25,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginVertical: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: dimensions.height * 0.13,
    // overflow: 'hidden',
    // borderRadius: (dimensions.height * 0.13) / 2,
    // marginTop: (-dimensions.height * 0.13) / 2,
    // width: '100%',
    // height: '100%',
    flex: 1,
    // borderWidth: 5,
    // borderColor: colors.white,
    zIndex: 1,
    backgroundColor: colors.grey_light,
    // flex: 1,
    // backgroundColor: 'blue',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: fontSz(13),
    fontFamily: fonts.bold,
    textAlign: 'center',
    padding: 5,
  },
});

const UpdateCarouselScreen = ({navigation}) => {
  const {carousel, loading} = useContext(AuthContext);
  if (loading.carousel) return <FeedsLoader />;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carouselToDelete, setCarouselToDelete] = useState(null);
  const {loading: deleteLoading, request} = useApi(deleteCarousel);

  const handleDelete = async carousel => {
    request(carousel.id)
      .then(async () => {
        await deleteFileFromStorage(carousel.image, folderRefs.CAROUSEL);
        showToast(toast.types.SUCCESS, 'Carousel successfully deleted');
      })
      .catch(error => {
        showToast(toast.types.ERROR, formatErrorMessage(error));
      });
  };

  return (
    <>
      <ActivityIndicator visible={deleteLoading} portal />
      <FlatList
        data={carousel}
        style={{flex: 1, backgroundColor: colors.grey_dark}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15, paddingBottom: 100}}
        key={feed => feed._id.toString()}
        renderItem={({item}) => {
          return (
            <View>
              <CarouselCard
                carousel={item}
                onPress={() =>
                  navigation.navigate(routes.CAROUSELUPDATE, item.id)
                }
              />
              <TouchableOpacity
                onPress={() => {
                  setCarouselToDelete(item);
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
          carouselToDelete && handleDelete(carouselToDelete);
          setShowDeleteModal(false);
        }}
        onCancel={() => {
          setShowDeleteModal(false);
          setCarouselToDelete(null);
        }}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate(routes.ADDCAROUSEL)}
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

export default UpdateCarouselScreen;
