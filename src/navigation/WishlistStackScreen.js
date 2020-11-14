/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {WishlistScreen, DetailScreen} from '../screens';
const WishlisthStack = createStackNavigator();
const WishlistStackScreen = ({navigation}) => (
  <WishlisthStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#01b4e4'},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold', alignItems: 'center'},
    }}>
    <WishlisthStack.Screen
      name="Wishlist"
      component={WishlistScreen}
      options={{
        headerLeft: () => (
          <Icon.Button
            name="menu"
            size={25}
            backgroundColor="#01b4e4"
            onPress={() => navigation.openDrawer()}
          />
        ),
        // headerRight: () => (
        //   <Icon.Button
        //     name="bookmarks"
        //     size={25}
        //     backgroundColor="#01b4e4"
        //     onPress={() => navigation.navigate('Bookmark')}
        //   />
        // ),
      }}
    />
    <WishlisthStack.Screen
      name="Detail"
      component={DetailScreen}
      options={{
        title: 'Detail',
        headerLeft: () => (
          <Icon.Button
            name="arrow-back-circle-outline"
            size={30}
            backgroundColor="#01b4e4"
            onPress={() => navigation.goBack()}
          />
        ),
        // headerRight: () => (
        //   <Icon.Button
        //     name="bookmarks"
        //     size={25}
        //     backgroundColor="#01b4e4"
        //     onPress={() => navigation.navigate('Bookmark')}
        //   />
        // ),
      }}
    />
  </WishlisthStack.Navigator>
);

export default WishlistStackScreen;
