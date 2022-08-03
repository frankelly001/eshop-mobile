import AppLink from 'react-native-app-link';

export const appNames = {
  FACEBOOK: 'Facebook',
  INSTAGRAM: 'Instagram',
  TWITTER: 'Twitter',
  YOUTUBE: 'Youtube',
  WHATSAPP: 'Whatsapp',
};

const LinkInfo = {
  [appNames.FACEBOOK]: {
    appName: appNames.FACEBOOK,
    playStoreId: 'com.facebook.katana',
  },
  [appNames.INSTAGRAM]: {
    appName: appNames.INSTAGRAM,
    playStoreId: 'com.instagram.android',
  },
  [appNames.TWITTER]: {
    appName: appNames.TWITTER,
    playStoreId: 'com.twitter.android',
  },
  [appNames.WHATSAPP]: {
    appName: appNames.WHATSAPP,
    playStoreId: 'com.whatsapp',
  },
  [appNames.YOUTUBE]: {
    appName: appNames.YOUTUBE,
    playStoreId: 'com.google.android.youtube',
  },
};

const linkType = {
  [appNames.FACEBOOK]:
    'https://www.facebook.com/profile.php?id=100004150786883',
  [appNames.INSTAGRAM]: 'https://www.instagram.com/frankelly_001/',
  [appNames.TWITTER]:
    'https://twitter.com/Frankly75005184?t=tcxx1k-qAhwXeEjUYJB-KQ&s=09',
  [appNames.YOUTUBE]:
    'https://www.youtube.com/channel/UCtFh6m7eG4Rh5VGO32cTvBw/',
  [appNames.WHATSAPP]: 'whatsapp://send?phone=+2348176507344',
};

export const openSocialLink = nameOfLink => {
  AppLink.maybeOpenURL(linkType[nameOfLink], LinkInfo[nameOfLink])
    .then(() => {})
    .catch(error => {
      console.log(error.message);
    });
};
