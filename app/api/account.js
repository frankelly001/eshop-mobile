import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const AccountDetails = {
  title: 'Account Details',
  list: [
    {
      _id: '1',
      name: 'Orders',
      icon: 'shopping-outline',
      IconTag: MaterialCommunityIcons,
    },
    {
      _id: '2',
      name: 'Saved',
      icon: 'heart-outline',
      IconTag: MaterialCommunityIcons,
    },
    {
      _id: '3',
      name: 'Vouchers',
      icon: 'wallet-giftcard',
      IconTag: MaterialCommunityIcons,
    },
    {
      _id: '4',
      name: 'Pending Reviews',
      icon: 'pending-actions',
      IconTag: MaterialIcons,
    },
    {
      _id: '5',
      name: 'Recently Viewed',
      icon: 'back-in-time',
      IconTag: Entypo,
    },
    {
      _id: '6',
      name: 'Recently Searched',
      icon: 'youtube-searched-for',
      IconTag: MaterialIcons,
    },
  ],
};

const AccountSettings = {
  title: 'Account Settings',
  list: [
    {_id: '1', name: 'Details'},
    {_id: '2', name: 'Address Book'},
    {_id: '3', name: 'Change Password'},
  ],
};

export {AccountDetails, AccountSettings};

// export function getFeed() {
//     return feed;
// }
