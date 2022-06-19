import {StyleSheet, StatusBar} from 'react-native';
import colors from '../../config/colors';
import fonts from '../../config/fonts';
import {fontSz} from '../../config/responsiveSize';

const SummaryStyles = StyleSheet.create({
  modalHeaderContainer: {
    backgroundColor: colors.purple,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  modalSubHeaderContainer: {
    backgroundColor: colors.grey_light,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  modalHeader: {
    fontSize: fontSz(18),
    fontFamily: fonts.bold,
    color: colors.white,
  },
  modalSubHeader: {
    fontSize: fontSz(12),
    fontFamily: fonts.bold,
    color: colors.grey_dark_2,
  },
  modalDetailsContainer: {},
  modalDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 15,
    // backgroundColor: 'red',
  },
  modalDetailLabel: {
    fontFamily: fonts.bold,
    color: colors.grey_dark_2,
  },
  LeftContainer: {
    // backgroundColor: 'yellow',
    flex: 2.5,
  },
  RightContainer: {
    // backgroundColor: 'green',
    flex: 0.5,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: fontSz(12.5),
    fontFamily: fonts.bold,
  },
  subTitle: {
    fontSize: fontSz(11),
    color: colors.grey_dark_3,
  },
  itemTotal: {
    fontSize: fontSz(11),
    fontFamily: fonts.bold,
  },
  modalBottomHeaderContainer: {
    backgroundColor: colors.purple,
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomContainer: {
    // position: 'absolute',
    // bottom: StatusBar.,
    // backgroundColor: 'white',
  },
});

export default SummaryStyles;
