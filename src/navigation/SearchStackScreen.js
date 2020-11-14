import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {SearchScreen, DetailScreen} from '../screens';
const SearchStack = createStackNavigator();
const SearchStackScreen = ({navigation}) => (
  <SearchStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#01b4e4'},
      headerTintColor: '#fff',
      headerTitleStyle: {fontWeight: 'bold', alignItems: 'center'},
    }}>
    <SearchStack.Screen
      name="Search"
      component={SearchScreen}
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
    <SearchStack.Screen
      name="Detail"
      component={DetailScreen}
      options={{
        title: 'Detail',
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
  </SearchStack.Navigator>
);

export default SearchStackScreen;
