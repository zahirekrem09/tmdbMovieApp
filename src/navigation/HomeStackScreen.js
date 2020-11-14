/* eslint-disable prettier/prettier */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {HomeScreen, DetailScreen} from '../screens';
const HomeStack = createStackNavigator();

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#01b4e4'},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold', alignItems: 'center'},
    }}>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Home',
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
    <HomeStack.Screen
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
  </HomeStack.Navigator>
);
export default HomeStackScreen;
