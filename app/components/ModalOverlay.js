import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Portal} from 'react-native-portalize';
import colors from '../config/colors';

const ModalOverlay = ({portal, children, modalStyle}) => {
  const Container = portal ? Portal : React.Fragment;

  return (
    <Container>
      <View style={[styles.overlay, modalStyle]}>{children}</View>
    </Container>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grey_dark_3_tranparent,
    position: 'absolute',
    zIndex: 1,
  },
});

export default ModalOverlay;
