import React, {useRef} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import ImageInput from './ImageInput';

const ImageInputList = ({
  imageUris = [],
  onRemoveImage,
  onAddImage,
  maxNumofImage = 5,
}) => {
  const scrollView = useRef();

  return (
    <View
      style={{
        width: '100%',
        alignItems: maxNumofImage <= 3 ? 'center' : 'flex-start',
      }}>
      <ScrollView
        ref={scrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}>
        <View style={styles.container}>
          {imageUris.map(uri => (
            <View key={uri} style={styles.image}>
              <ImageInput
                imageUri={uri}
                onChangeImage={() => onRemoveImage(uri)}
              />
            </View>
          ))}
          {imageUris.length < maxNumofImage && (
            <ImageInput onChangeImage={uri => onAddImage(uri)} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    marginRight: 10,
  },
});

export default ImageInputList;
