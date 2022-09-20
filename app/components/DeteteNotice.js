import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import colors from '../config/colors';
import AppButton from './AppButton';
import AppText from './AppText';
import ModalOverlay from './ModalOverlay';

const {width} = Dimensions.get('screen');
const DeleteNotice = ({
  visible,
  onDelete,
  onCancel,
  noticeLabel = 'Are you sure, you want to Delete item?',
}) => {
  if (!visible) return null;

  return (
    <ModalOverlay>
      <View
        style={{
          width: width * 0.85,
          // height: width * 0.85,
          backgroundColor: colors.grey_light,
          borderRadius: 20,
          padding: 10,
          // marginTop: -50,
          // margin: 20,
        }}>
        <AppText style={{textAlign: 'center', marginBottom: 5}}>
          {noticeLabel}
        </AppText>

        <View style={{flexDirection: 'row'}}>
          <AppButton
            label="Yes"
            bgStyle={{flex: 1, margin: 10, backgroundColor: colors.red_dark}}
            onPress={onDelete}
          />
          <AppButton
            label="Cancel"
            bgStyle={{flex: 1, margin: 10, backgroundColor: colors.grey_dark}}
            onPress={onCancel}
          />
        </View>
      </View>
    </ModalOverlay>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default DeleteNotice;
