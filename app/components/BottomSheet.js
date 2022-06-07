import React from 'react';
import {Dimensions} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';

const {height} = Dimensions.get('screen');
const BottomSheet = ({modalRef, children}) => {
  return (
    <Portal>
      <Modalize
        ref={modalRef}
        modalHeight={height / 2}
        panGestureEnabled={true}
        closeOnOverlayTap={true}>
        {children}
      </Modalize>
    </Portal>
  );
};

export default BottomSheet;
