import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import colors from '../config/colors';
import {wp} from '../config/responsiveSize';
import ReactNativeZoomableView from './ReactNativeZoomableView';
const {height} = Dimensions.get('screen');
const ImageView = ({route}) => {
  const {imageUris, currentIndex} = route?.params;
  const [selectedIndex, setSelectedIndex] = useState(currentIndex);

  return (
    <View
      style={{
        backgroundColor: colors.grey_light,
        height: '100%',
        backfaceVisibility: 'visible',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{width: wp(400), height: wp(400)}}>
        <ReactNativeZoomableView
          maxZoom={2}
          minZoom={1}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders={true}
          captureEvent={true}>
          <Image
            resizeMode="contain"
            source={{uri: imageUris[selectedIndex]}}
            style={{width: '100%', height: '100%'}}
          />
        </ReactNativeZoomableView>
      </View>
      <View style={styles.selectionContainer}>
        {imageUris.map((img, i) => (
          <Pressable
            style={[
              styles.selectImage,
              {opacity: i !== selectedIndex ? 0.3 : 1},
            ]}
            key={img}
            onPress={() => setSelectedIndex(i)}>
            <Image
              resizeMode="stretch"
              key={img}
              source={{uri: img}}
              style={{width: '100%', height: '100%'}}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  selectionContainer: {
    backgroundColor: colors.grey_dark_2_tranparent,
    position: 'absolute',
    height: 0.08 * height,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    width: '100%',
    paddingVertical: 2,
    // opacity: 0.5,
  },
  selectImage: {
    width: height * 0.065,
    height: height * 0.065,
    borderRadius: 5,
    overflow: 'hidden',
    margin: 5,
    backgroundColor: '#fff',
  },
});

export default ImageView;
