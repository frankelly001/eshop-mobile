import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import AccountNavigator from './AccountNavigator';
import CategoriesNavigator from './CategoriesNavigator';
import FeedNavigator from './FeedNavigator';
import HelpNavigator from './HelpNavigator';
import HomeNavigator from './HomeNavigator';
import routes from './routes';
import HomeInActiveIcon from '../assets/icons/home_inactive.svg';
import HomeActiveIcon from '../assets/icons/home_active.svg';
import CategoriesInActiveIcon from '../assets/icons/categories_inactive.svg';
import CategoriesActiveIcon from '../assets/icons/categories_active.svg';
import FeedInActiveIcon from '../assets/icons/feed_inactive.svg';
import FeedActiveIcon from '../assets/icons/feed_active.svg';
import AccountInActiveIcon from '../assets/icons/account_inactive.svg';
import AccountActiveIcon from '../assets/icons/account_active.svg';
import HelpInActiveIcon from '../assets/icons/help_inactive.svg';
import HelpActiveIcon from '../assets/icons/help_active.svg';
import BottomTabIcon from './BottomTabIcon';
import BottonTabLabel from './BottomTabLabel';
import colors from '../config/colors';
import TabButton from './TabButton';

const Tab = createBottomTabNavigator();

const AppNavigator = props => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        lazy: true,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 50,
          backgroundColor: colors.grey_light,
          position: 'absolute',
          bottom: 8,
          right: 8,
          left: 8,
          borderRadius: 30,

          // shadowColor: '#000',
          // shadowOffset: {
          //   width: 0,
          //   height: 4,
          // },
          // shadowOpacity: 0.32,
          // shadowRadius: 5.46,

          // elevation: 9,
        },
        // tabBarButton: props => <TabButton {...props} />,
      }}>
      <Tab.Screen
        name={routes.HOMETAB}
        component={HomeNavigator}
        options={{
          tabBarButton: props => (
            <TabButton
              label="Home"
              ActiveIcon={HomeActiveIcon}
              InActiveIcon={HomeInActiveIcon}
              {...props}
            />
          ),
        }}
      />
      <Tab.Screen
        name={routes.CATEGORIESTAB}
        component={CategoriesNavigator}
        options={{
          tabBarButton: props => (
            <TabButton
              label="Categories"
              ActiveIcon={CategoriesActiveIcon}
              InActiveIcon={CategoriesInActiveIcon}
              {...props}
            />
          ),
        }}
      />
      <Tab.Screen
        name={routes.FEEDTAB}
        component={FeedNavigator}
        options={{
          tabBarButton: props => (
            <TabButton
              label="Feed"
              ActiveIcon={FeedActiveIcon}
              InActiveIcon={FeedInActiveIcon}
              {...props}
            />
          ),
        }}
      />
      <Tab.Screen
        name={routes.ACCOUNTTAB}
        component={AccountNavigator}
        options={{
          tabBarButton: props => (
            <TabButton
              label="Account"
              ActiveIcon={AccountActiveIcon}
              InActiveIcon={AccountInActiveIcon}
              {...props}
            />
          ),
        }}
      />
      <Tab.Screen
        name={routes.HELPTAB}
        component={HelpNavigator}
        options={{
          tabBarButton: props => (
            <TabButton
              label="Help"
              ActiveIcon={HelpActiveIcon}
              InActiveIcon={HelpInActiveIcon}
              {...props}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
