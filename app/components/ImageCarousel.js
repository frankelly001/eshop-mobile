import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Dimensions, Image} from 'react-native';
// import BackgroundCarousel from './BackgroundCarousel';

const images = [
  'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  'https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
  'https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
  'https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
];

const {width, height} = Dimensions.get('screen');

const ImageCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef?.current?.scrollTo({
      animated: true,
      y: 0,
      x: width * selectedIndex,
    });
    const interval = setInterval(() => {
      setSelectedIndex(
        selectedIndex === images.length - 1 ? 0 : selectedIndex + 1,
      );
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
          <Image key={img} source={{uri: img}} style={styles.carouselImage} />
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

const carouselHeight = height / 3;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: carouselHeight,
    // alignSelf: 'flex-start',
  },
  carouselImage: {
    width: width,
    height: carouselHeight,
  },
  circleContainer: {
    position: 'absolute',
    bottom: 15,
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
