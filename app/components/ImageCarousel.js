import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontSz, wp} from '../config/responsiveSize';
import AppText from './AppText';
import navigation from '../navigation/rootNavigation';
import routes from '../navigation/routes';
// import BackgroundCarousel from './BackgroundCarousel';

// const images = [
//   'https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
//   'https://images.unsplash.com/photo-1485550409059-9afb054cada4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80',
//   'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
//   'https://images.unsplash.com/photo-1429087969512-1e85aab2683d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
//   'https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
// ];

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

const ImageCarousel = ({categories}) => {
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
    <>
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: colors.white,
          paddingHorizontal: 5,
        }}>
        {categories.map(category => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routes.SEARCHED, {
                query: category,
                searchType: 'categoryFieldSearch',
                searchField: 'CATEGORY',
              })
            }
            key={category}
            style={{
              width: wp(60),
              height: wp(60),
              borderRadius: 5,
              margin: 5,
              overflow: 'hidden',
            }}>
            <Image style={{width: '100%', height: '100%'}} source={images[2]} />
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#35323477',
                paddingHorizontal: 1,
              }}>
              <AppText
                style={{
                  fontSize: fontSz(7),
                  color: colors.white,
                  fontFamily: fonts.extra_bold,
                  textAlign: 'center',
                  textTransform: 'capitalize',
                }}>
                {category}
              </AppText>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
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
