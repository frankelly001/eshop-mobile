import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Dimensions, Image} from 'react-native';

const images = [
  require('../assets/images/carouselimage_1.jpg'),
  require('../assets/images/carouselimage_2.jpg'),
  require('../assets/images/carouselimage_3.jpg'),
  require('../assets/images/carouselimage_4.jpg'),
  require('../assets/images/carouselimage_5.jpg'),
  require('../assets/images/carouselimage_6.jpg'),
  require('../assets/images/carouselimage_7.jpg'),
  require('../assets/images/carouselimage_8.jpg'),
];

const {width, height} = Dimensions.get('screen');

const ImageCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollRef = useRef(null);

  useEffect(() => {
    const currentIndex =
      selectedIndex === images.length - 1 ? 0 : selectedIndex + 1;
    const interval = setInterval(() => {
      scrollRef?.current?.scrollTo({
        animated: true,
        y: 0,
        x: width * currentIndex,
      });

      setSelectedIndex(currentIndex);
    }, 3000);
    return () => clearInterval(interval);
  });

  const uptSelectedIndex = event => {
    // width of the viewSize
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    // get current position of the scrollview
    const contentOffset = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.floor(contentOffset / viewSize);
    setSelectedIndex(currentIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        onMomentumScrollEnd={uptSelectedIndex}
        // onScroll={uptSelectedIndex}
        ref={scrollRef}>
        {images.map(img => (
          // <Image key={img} source={{uri: img}} style={styles.carouselImage} />
          <Image
            resizeMode="stretch"
            key={img}
            source={img}
            style={styles.carouselImage}
          />
        ))}
      </ScrollView>
      <View style={styles.circleContainer}>
        {images.map((img, i) => (
          <View
            key={img}
            style={[
              styles.whiteCircle,
              {opacity: i === selectedIndex ? 0.5 : 1},
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const carouselHeight = height / 3.5;
const styles = StyleSheet.create({
  container: {
    width: width,
    height: carouselHeight,
    // alignSelf: 'flex-start',
  },
  carouselImage: {
    width: width,
    height: carouselHeight,
  },
  circleContainer: {
    position: 'absolute',
    bottom: 10,
    height: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // alignSelf: 'center',
    width: '100%',
  },
  whiteCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
    backgroundColor: '#fff',
  },
});

export default ImageCarousel;
