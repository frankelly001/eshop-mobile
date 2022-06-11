import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import colors from '../config/colors';

const AppTextarea = props => {
  return (
    <View style={styles.textAreaContainer}>
      <TextInput
        style={styles.textArea}
        underlineColorAndroid="transparent"
        placeholder="Type something"
        placeholderTextColor="grey"
        numberOfLines={100}
        multiline={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: colors.grey_dark,
    borderWidth: 1,
    padding: 5,
    width: '100%',
    justifyContent: 'flex-start',
  },
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
    paddingVertical: 0,
    paddingHorizontal: 0,
    textAlignVertical: 'top',
  },
});

export default AppTextarea;
