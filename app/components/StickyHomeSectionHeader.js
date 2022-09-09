import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import colors from '../config/colors';
import fonts from '../config/fonts';
import {fontSz, wp} from '../config/responsiveSize';
import navigation from '../navigation/rootNavigation';
import routes from '../navigation/routes';
import AppText from './AppText';

const StickyHomeSectionHeader = ({categories}) => {
  return (
    <>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: colors.white,
          paddingHorizontal: 3,
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
              width: wp(63),
              height: wp(63),
              borderRadius: 5,
              margin: 3,
              overflow: 'hidden',
            }}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={require('../assets/images/carouselimage_3.jpg')}
            />
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
                  fontSize: fontSz(6.5),
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
      <View
        style={{
          backgroundColor: colors.grey_light_4,
          width: '100%',
          height: 40,
          justifyContent: 'center',
          paddingHorizontal: 10,
        }}>
        <AppText>New Arrivals</AppText>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default StickyHomeSectionHeader;
