/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeScreen, SearchScreen, WishlistScreen} from '../screens';

import HomeStackScreen from './HomeStackScreen';
import WishlistStackScreen from './WishlistStackScreen';
import SearchStackScreen from './SearchStackScreen';

const Tab = createMaterialBottomTabNavigator();
// const Tab = createBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator
    shifting={true}
    initialRouteName="Home"
    activeColor="#fff"
    barStyle={{backgroundColor: '#01b4e4'}}>
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#01b4e4',
        tabBarIcon: ({color}) => <Icon name="home" color={color} size={26} />,
      }}
    />
    <Tab.Screen
      name="Search"
      component={SearchStackScreen}
      options={{
        tabBarLabel: 'Search',
        tabBarColor: '#01b4e4',
        tabBarIcon: ({color}) => (
          <Icon2 name="search" color={color} size={26} />
        ),
      }}
    />

    <Tab.Screen
      name="Wishlists"
      component={WishlistStackScreen}
      options={{
        tabBarLabel: 'Wishlist',
        tabBarColor: '#01b4e4',
        tabBarIcon: ({color}) => (
          <Icon3 name="book-plus-multiple" color={color} size={26} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;
