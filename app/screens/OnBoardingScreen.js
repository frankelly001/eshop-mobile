import {useIsFocused} from '@react-navigation/native';
import * as React from 'react';
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import {authStorageKeys, storeUserData} from '../api/storage/authStorage';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontSz} from '../config/responsiveSize';
import routes from '../navigation/routes';
// import {TouchableOpacity} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('screen');

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

// const bgs = ['#b5057a', '#dc3545', '#5d05b5', '#9E1E7C'];
const bgs = ['#b5057a', '#dc3545', '#5d05b5', '#616161'];
// const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
const DATA = [
  {
    key: '3571572',
    title: 'Welcome to eShop',
    description:
      "eShop Nigeria is #1 Online store in Nigeria, it's an Online Store for all kinds of Products & Services",
    image: 'https://m.media-amazon.com/images/I/41ypb39SsSL._SY450_.jpg',
  },
  {
    key: '3571603',
    title: 'Easy Shoping',
    description:
      'Shop Online for All Kinds of Products, Services & Enjoy Great Prices, Deals And Offers.',
    image:
      'https://rukminim1.flixcart.com/image/416/416/kj7gwi80-0/stuffed-toy/m/w/m/3-feet-blue-american-style-extra-large-jumbo-huggable-teddy-bear-original-imafytxshhm6fvny.jpeg?q=70',
  },
  {
    key: '3571747',
    title: 'Secure Payment',
    description:
      'An online shop you can trust with your payments. Order now and enjoy pay on delivery!',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcvK7EtesmM7rCG9lNqhmh8_kyQRx3zEq4QyiKicr50Mcx99Jwd_pLi5wM4dAy9i-UCWw&usqp=CAU',
  },
  {
    key: '3571680',
    title: 'Quick Delivery',
    description:
      'Get your ordered items within 24hours in Lagos and 3 days in other parts of the state in Nigeria',
    image: 'https://image.smythstoys.com/zoom/198273_5.jpg',
  },
];

const Indicator = ({scrollX}) => {
  return (
    <View style={{position: 'absolute', bottom: 100, flexDirection: 'row'}}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width]; // next slide // current slide // prev slide
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 0.9, 0.5],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: colors.white,
              margin: 10,
              transform: [{scale}],
              opacity,
            }}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({scrollX}) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map(bg => bg),
  });
  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, {backgroundColor}]} />
  );
};

const Square = ({scrollX}) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1,
  );

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['35deg', '0deg', '35deg'],
  });
  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });

  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor: colors.grey_light,
        borderRadius: 120,
        position: 'absolute',
        top: -height * 0.6,
        left: -height * 0.3,
        transform: [
          {
            rotate,
          },
          {
            translateX,
          },
        ],
      }}
    />
  );
};

const OnBoardingScreen = ({navigation}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const focus = useIsFocused();

  return (
    <View style={styles.container}>
      <StatusBar hidden={focus} />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        horizontal
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        // contentContainerStyle={{paddingBottom: 100}}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={item => item.key}
        renderItem={({item, index}) => {
          return (
            <View style={{width, alignItems: 'center', padding: 20}}>
              <View
                style={{
                  flex: 0.7,
                  // backgroundColor: 'red',
                  justifyContent: 'center',
                }}>
                <Image
                  source={{uri: item.image}}
                  style={{
                    width: width / 2,
                    height: width / 2,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View style={{width: '100%'}}>
                <AppText
                  style={{
                    fontFamily: fonts.extra_bold,
                    fontSize: fontSz(15),
                    marginBottom: 10,
                    color: colors.white,
                  }}>
                  {item.title}
                </AppText>
                <AppText
                  style={{
                    color: colors.white,
                    fontFamily: fonts.semi_bold,
                  }}>
                  {item.description}
                </AppText>
              </View>

              {index + 1 === DATA.length && (
                <AppButton
                  label="Let's Shop!"
                  onPress={() => {
                    navigation.replace(routes.ESHOP);
                    storeUserData(authStorageKeys.APP_USE_READY, true);
                  }}
                  bgStyle={{
                    width: '50%',
                    position: 'absolute',
                    right: 20,
                    bottom: 20,
                    backgroundColor: 'transparent',
                    borderWidth: 1,
                    borderColor: colors.white,
                  }}
                />
              )}
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} />
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
