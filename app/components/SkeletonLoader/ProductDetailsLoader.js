import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Eshop_LoaderIcon from '../../assets/icons/eshop_loaderIcon.svg';
import {wp} from '../../config/responsiveSize';

const {width, height} = Dimensions.get('screen');
const textLines = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30,
];
const ProductDetailsLoader = props => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <SkeletonPlaceholder>
          <View
            style={{
              width: width,
              height: 0.45 * height,
            }}
          />
        </SkeletonPlaceholder>
        <View style={styles.iconContainer}>
          <Eshop_LoaderIcon width={100} height={100} opacity={0.5} />
        </View>
      </View>
      <View style={{paddingHorizontal: 10, paddingVertical: 3}}>
        <SkeletonPlaceholder>
          <View
            style={{
              width: '100%',
              height: 25,
              borderRadius: 5,
              marginVertical: 3,
            }}
          />
          <View
            style={{
              width: width * 0.28,
              height: 25,
              borderRadius: 5,
              marginVertical: 5,
              marginBottom: 5,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <View
              style={{
                width: width * 0.35,
                height: 25,
                borderRadius: 5,
                marginVertical: 5,
                marginRight: 5,
              }}
            />
            <View style={{width: width * 0.28, height: 15, borderRadius: 5}} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <View
              style={{
                width: wp(25 + 25 * 0.6),
                height: wp(25 + 25 * 0.6),
                borderRadius: 50,
                marginRight: 5,
              }}
            />
            <View style={{width: width * 0.2, height: 15, borderRadius: 4}} />
          </View>
          <View
            style={{
              width: width * 0.2,
              height: 15,
              borderRadius: 4,
              marginVertical: 5,
            }}
          />

          <View
            style={{
              width: width * 0.7,
              height: 40,
              borderRadius: 50,
              marginRight: 5,
              marginVertical: 5,
            }}
          />
          <View
            style={{
              width: width * 0.7,
              height: 40,
              borderRadius: 50,
              marginRight: 5,
              marginVertical: 5,
              marginBottom: 15,
            }}
          />
          <View
            style={{
              width: width * 0.2,
              height: 15,
              borderRadius: 4,
              marginVertical: 5,
              marginBottom: 10,
            }}
          />

          {textLines.map(_ => (
            <View
              key={_}
              style={{
                width: width,

                height: 5,
                borderRadius: 4,
                marginBottom: 2,
                marginRight: 2,
              }}
            />
          ))}
        </SkeletonPlaceholder>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
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

export default ProductDetailsLoader;
