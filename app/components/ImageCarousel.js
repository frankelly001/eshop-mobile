import React, {useState, useRef, useEffect, useContext} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  Animated,
} from 'react-native';
import AuthContext from '../auth/AuthContext';

// const images = [
//   require('../assets/images/carouselimage_1.jpg'),
//   require('../assets/images/carouselimage_2.jpg'),
//   require('../assets/images/carouselimage_3.jpg'),
//   require('../assets/images/carouselimage_4.jpg'),
//   require('../assets/images/carouselimage_5.jpg'),
//   require('../assets/images/carouselimage_6.jpg'),
//   require('../assets/images/carouselimage_7.jpg'),
//   require('../assets/images/carouselimage_8.jpg'),
// ];

const {width, height} = Dimensions.get('screen');

const ImageCarousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {carousel, loading} = useContext(AuthContext);

  const scrollRef = useRef(null);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const images = carousel;

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
      <Animated.ScrollView
        horizontal
        pagingEnabled
        onMomentumScrollEnd={uptSelectedIndex}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}>
        {images.map(caro => (
          // <Image key={img} source={{uri: img}} style={styles.carouselImage} />
          <Image
            resizeMode="stretch"
            key={caro.id}
            source={{uri: caro.image}}
            style={styles.carouselImage}
          />
        ))}
      </Animated.ScrollView>
      <View style={styles.circleContainer}>
        {images.map((caro, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width]; // next slide // current slide // prev slide

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          });
          const w = scrollX.interpolate({
            inputRange,
            outputRange: [6, 10, 6],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={caro.id}
              style={{
                ...styles.whiteCircle,
                width: w,
                opacity,
              }}
            />
          );
        })}
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
    height: 6,
    borderRadius: 3,
    margin: 5,
    backgroundColor: '#fff',
  },
});

export default ImageCarousel;
