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

const Tab = createBottomTabNavigator();

const AppNavigator = props => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        lazy: true,
        tabBarHideOnKeyboard: true,
        // tabBarShowLabel: false,
        // tabBarLabelStyle,
        // tabBarLabel
      }}>
      <Tab.Screen
        name={routes.HOMETAB}
        component={HomeNavigator}
        options={{
          tabBarIcon: ({size, focused}) => (
            <BottomTabIcon
              size={size}
              focused={focused}
              ActiveIcon={HomeActiveIcon}
              InActiveIcon={HomeInActiveIcon}
            />
          ),
          tabBarLabel: ({focused}) => (
            <BottonTabLabel focused={focused}>Home</BottonTabLabel>
          ),
        }}
      />
      <Tab.Screen
        name={routes.CATEGORIESTAB}
        component={CategoriesNavigator}
        options={{
          tabBarIcon: ({size, focused}) => (
            <BottomTabIcon
              size={size}
              focused={focused}
              ActiveIcon={CategoriesActiveIcon}
              InActiveIcon={CategoriesInActiveIcon}
            />
          ),
          tabBarLabel: ({focused}) => (
            <BottonTabLabel focused={focused}>Categories</BottonTabLabel>
          ),
        }}
      />
      <Tab.Screen
        name={routes.FEEDTAB}
        component={FeedNavigator}
        options={{
          tabBarIcon: ({size, focused}) => (
            <BottomTabIcon
              size={size}
              focused={focused}
              ActiveIcon={FeedActiveIcon}
              InActiveIcon={FeedInActiveIcon}
            />
          ),
          tabBarLabel: ({focused}) => (
            <BottonTabLabel focused={focused}>Feed</BottonTabLabel>
          ),
        }}
      />
      <Tab.Screen
        name={routes.ACCOUNTTAB}
        component={AccountNavigator}
        options={{
          tabBarIcon: ({size, focused}) => (
            <BottomTabIcon
              size={size}
              focused={focused}
              ActiveIcon={AccountActiveIcon}
              InActiveIcon={AccountInActiveIcon}
            />
          ),
          tabBarLabel: ({focused}) => (
            <BottonTabLabel focused={focused}>Account</BottonTabLabel>
          ),
        }}
      />
      <Tab.Screen
        name={routes.HELPTAB}
        component={HelpNavigator}
        options={{
          tabBarIcon: ({size, focused}) => (
            <BottomTabIcon
              size={size}
              focused={focused}
              ActiveIcon={HelpActiveIcon}
              InActiveIcon={HelpInActiveIcon}
            />
          ),
          tabBarLabel: ({focused}) => (
            <BottonTabLabel focused={focused}>Help</BottonTabLabel>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
