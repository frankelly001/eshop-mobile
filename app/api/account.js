import React from 'react';
import Icon, {Icons} from '../components/Icons';
import routes from '../navigation/routes';

const AccountDetails = {
  title: 'Account Details',
  list: [
    {
      _id: '1',
      name: 'Orders',
      icon: ({...otherProps}) => (
        <Icon
          type={Icons.MaterialCommunityIcons}
          name="shopping-outline"
          {...otherProps}
        />
      ),
      routeName: routes.ORDERS,
    },
    {
      _id: '2',
      name: 'Saved',
      icon: ({...otherProps}) => (
        <Icon
          type={Icons.MaterialCommunityIcons}
          name="heart-outline"
          {...otherProps}
        />
      ),
      routeName: routes.SAVED,
    },
    {
      _id: '3',
      name: 'Vouchers',
      icon: ({...otherProps}) => (
        <Icon
          type={Icons.MaterialCommunityIcons}
          name="wallet-giftcard"
          {...otherProps}
        />
      ),
      routeName: routes.VOUCHERS,
    },
    {
      _id: '4',
      name: 'Pending Reviews',
      icon: ({...otherProps}) => (
        <Icon
          type={Icons.MaterialIcons}
          name="pending-actions"
          {...otherProps}
        />
      ),
      routeName: routes.PENDING_REVIEWS,
    },
    {
      _id: '5',
      name: 'Recently Viewed',
      icon: ({...otherProps}) => (
        <Icon type={Icons.Entypo} name="back-in-time" {...otherProps} />
      ),
      routeName: routes.RECENTLY_VIEWED,
    },
    {
      _id: '6',
      name: 'Recently Searched',
      icon: ({...otherProps}) => (
        <Icon
          type={Icons.MaterialIcons}
          name="youtube-searched-for"
          {...otherProps}
        />
      ),
      routeName: routes.RECENTLY_SEARCHED,
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
