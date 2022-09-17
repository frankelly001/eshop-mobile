import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Eshop_LoaderIcon from '../../assets/icons/eshop_loaderIcon.svg';
import colors from '../../config/colors';
import {hp, wp} from '../../config/responsiveSize';
import ColumnList from '../ColumnList';

const dimensions = Dimensions.get('screen');
const FeedCardSampleLoader = () => {
  return (
    <View style={styles.bgLoaderContainer}>
      <SkeletonPlaceholder backgroundColor={colors.white}>
        <View
          style={{
            width: '100%',
            height: dimensions.height * 0.2 * 0.7,
            borderRadius: 20,
            overflow: 'hidden',
            backgroundColor: colors.white,
            //   opacity: 0.8,
          }}
        />
      </SkeletonPlaceholder>

      <View style={styles.abContainer}>
        <View style={styles.abContentContainer}>
          <SkeletonPlaceholder backgroundColor={colors.grey_light}>
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'red',
                // opacity: 0.5,
              }}
            />
          </SkeletonPlaceholder>
          <View style={styles.iconContainer}>
            <Eshop_LoaderIcon width={50} height={50} opacity={0.5} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bgLoaderContainer: {
    flex: 1,
    height: dimensions.height * 0.2,
    margin: 2,
    borderRadius: 5,
    justifyContent: 'flex-end',

    overflow: 'hidden',
    margin: 10,
    // opacity: 0.8,
  },
  abContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  abContentContainer: {
    // backgroundColor: 'red',
    width: dimensions.height * 0.13,
    height: dimensions.height * 0.13,
    marginTop: (-dimensions.height * 0.13) / 2,
    borderRadius: (dimensions.height * 0.13) / 2,
    borderWidth: 5,
    borderColor: colors.white,
    overflow: 'hidden',
    // top: 0,
    // bottom: 0,
    // left: 0,
    // right: 0,
  },
  iconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

const ordersSample = [
  {order: 'sample1'},
  {order: 'sample2'},
  {order: 'sample3'},
  {order: 'sample4'},
  {order: 'sample5'},
];

const FeedsLoader = props => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ColumnList
        data={ordersSample}
        contentContainerStyle={{
          paddingHorizontal: 3,
          backgroundColor: colors.grey_light,
        }}
        keyExtractor={item => item.order}
        renderItem={item => <FeedCardSampleLoader key={item.order} />}
      />
    </ScrollView>
  );
};

export default FeedsLoader;
