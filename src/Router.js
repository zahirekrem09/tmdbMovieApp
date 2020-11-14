import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {View, StatusBar, ActivityIndicator, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {DrawerContent, WishlistScreen, HomeScreen} from './screens';

import AuthStackScreen from './navigation/AuthStackScreen';
import MainTabScreen from './navigation/MainTabScreen';

const Drawer = createDrawerNavigator();

const Router = () => {
  const dispatch = useDispatch();
  const token = useSelector((s) => s.users.userToken);
  const isLoading = useSelector((s) => s.users.isLoading);
  const isDarkTheme = useSelector((s) => s.users.isDarkTheme);
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#F6F7F9',
      text: '#051E34',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#051E34',
      text: '#ffffff',
    },
  };
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  useEffect(() => {
    const getToken = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (err) {
        Alert.alert('TMDB-App', err);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    };
    getToken();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#01b4e4" />
      </View>
    );
  }
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <StatusBar backgroundColor="#01b4e4" barStyle="light-content" />
        {token != null ? (
          <Drawer.Navigator
            screenOptions={{
              headerShown: false,
            }}
            drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={MainTabScreen} />
            <Drawer.Screen name="Wishlists" component={WishlistScreen} />
          </Drawer.Navigator>
        ) : (
          <AuthStackScreen />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Router;
