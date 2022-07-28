import colors from '../../config/colors';

const types = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
};

const IconSources = {
  [types.SUCCESS]: require('../../assets/icons/animatedIcons/success.json'),
  [types.ERROR]: require('../../assets/icons/animatedIcons/error.json'),
  [types.INFO]: require('../../assets/icons/animatedIcons/info.json'),
};

const toastColors = {
  [types.SUCCESS]: colors.green,
  [types.ERROR]: colors.red_dark,
  [types.INFO]: colors.purple,
};

export default {types, IconSources, toastColors};
