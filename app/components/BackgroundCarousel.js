import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Dimensions, Image} from 'react-native';

const {width} = Dimensions.get('screen');

const BackgroundCarousel = ({images}) => {
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
          <Image key={img} source={{uri: img}} style={styles.backgroundImage} />
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 350,
    alignSelf: 'flex-start',
  },
  backgroundImage: {
    width: width,
    height: 350,
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

export default BackgroundCarousel;
