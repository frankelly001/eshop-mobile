import React from 'react';
import Icon, {Icons} from '../components/Icons';
import routes from '../navigation/routes';

const AccountDetails = {
  title: 'Account Details',
  list: [
    {
      _id: '1',
      name: 'Orders',
      icon: ({size, style}) => (
        <Icon
          type={Icons.MaterialCommunityIcons}
          name="shopping-outline"
          size={size}
          style={style}
        />
      ),
    },
    {
      _id: '2',
      name: 'Saved',
      icon: ({size, style}) => (
        <Icon
          type={Icons.MaterialCommunityIcons}
          name="heart-outline"
          size={size}
          style={style}
        />
      ),
      routeName: routes.SAVED,
    },
    {
      _id: '3',
      name: 'Vouchers',
      icon: ({size, style}) => (
        <Icon
          type={Icons.MaterialCommunityIcons}
          name="wallet-giftcard"
          size={size}
          style={style}
        />
      ),
    },
    {
      _id: '4',
      name: 'Pending Reviews',
      icon: ({size, style}) => (
        <Icon
          type={Icons.MaterialIcons}
          name="pending-actions"
          size={size}
          style={style}
        />
      ),
    },
    {
      _id: '5',
      name: 'Recently Viewed',
      icon: ({size, style}) => (
        <Icon
          type={Icons.Entypo}
          name="back-in-time"
          size={size}
          style={style}
        />
      ),
    },
    {
      _id: '6',
      name: 'Recently Searched',
      icon: ({size, style}) => (
        <Icon
          type={Icons.MaterialIcons}
          name="youtube-searched-for"
          size={size}
          style={style}
        />
      ),
    },
  ],
};

const AccountSettings = {
  title: 'Account Settings',
  list: [
    {_id: '1', name: 'Details', routeName: routes.USERDETAILS},
    {_id: '2', name: 'Address Book', routeName: routes.ADDRESSBOOK},
    {_id: '3', name: 'Change Password', routeName: routes.CHANGEPASSWORD},
  ],
};

export {AccountDetails, AccountSettings};

// export function getFeed() {
//     return feed;
// }
