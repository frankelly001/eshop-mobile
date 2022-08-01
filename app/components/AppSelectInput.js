import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../config/colors';
import {fontSz, hp} from '../config/responsiveSize';
import stateRegion from '../utilities/stateRegion';

const stateList = Object.keys(stateRegion).map((key, index) => {
  return {label: key, value: key};
});

const AppSelectInput = ({
  dropdownStyle,
  disableSearchInput,
  value,
  ...otherProps
}) => {
  // const [value, setValue] = useState(null);
  return (
    <Dropdown
      style={[styles.dropdown, dropdownStyle]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={[
        styles.inputSearchStyle,
        disableSearchInput && {display: 'none'},
      ]}
      iconStyle={styles.iconStyle}
      search
      maxHeight={300}
      // data={stateList}
      // labelField="label"
      // valueField="value"
      // placeholder="Select item"
      // searchPlaceholder="Search..."
      value={value}
      // onChange={item => {
      //   setValue(item.value);
      // }}
      {...otherProps}
      // renderLeftIcon={() => (
      //   <AntDesign
      //     style={styles.icon}
      //     color={value ? colors.purple : colors.grey_dark_2}
      //     name="Safety"
      //     size={20}
      //   />
      // )}
      renderItem={item => {
        return (
          <View style={styles.item}>
            <Text
              style={[
                styles.textItem,
                !item.value && {color: colors.red_dark},
              ]}>
              {item.label}
            </Text>
            {item.value === value && (
              <AntDesign
                style={styles.icon}
                color={colors.purple}
                name="Safety"
                size={20}
              />
            )}
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    // margin: 16,
    height: hp(36),
    width: '100%',
    // backgroundColor: 'white',
    borderRadius: 20,
    // padding: 0,
    paddingHorizontal: 15,
    // paddingVertical: 2,
    backgroundColor: colors.grey_light_2,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,

    // elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: fontSz(15),
    textTransform: 'capitalize',
  },
  placeholderStyle: {
    fontSize: fontSz(15),
    color: colors.grey_dark,
  },
  selectedTextStyle: {
    fontSize: fontSz(15),
    textTransform: 'capitalize',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    // backgroundColor: 'red',
    fontSize: fontSz(15),
  },
});

export default AppSelectInput;
