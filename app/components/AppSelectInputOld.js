import React, {useState} from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';
import stateRegion from '../utilities/stateRegion';
import {Dropdown} from 'react-native-element-dropdown';
import colors from '../config/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const stateList = Object.keys(stateRegion).map((key, index) => {
  return {label: key, value: key};
});

const AppSelectInputOld = props => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Dropdown
      style={[styles.dropdown, isFocus && {borderColor: colors.purple}]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={stateList}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? 'Select item' : '...'}
      searchPlaceholder="Search..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        setValue(item.value);
        setIsFocus(false);
      }}
      //   renderLeftIcon={() => (
      //     <AntDesign
      //       style={styles.icon}
      //       color={isFocus ? 'blue' : 'black'}
      //       name="Safety"
      //       size={20}
      //     />
      //   )}

      renderItem={item => {
        return (
          <View style={styles.item}>
            <Text style={styles.textItem}>{item.label}</Text>
            {item.value === value && (
              <AntDesign
                style={styles.icon}
                color="black"
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
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    // borderColor: 'gray',
    // borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 15, // 8
    paddingVertical: 5,
    backgroundColor: colors.grey_light_2,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 15, //8
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
});

export default AppSelectInputOld;
