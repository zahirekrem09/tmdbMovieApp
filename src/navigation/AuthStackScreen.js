import React from 'react';
import {OnboardingScreen, SignUpScreen, LoginScreen} from '../screens';

import {createStackNavigator} from '@react-navigation/stack';

const AuthStack = createStackNavigator();

const AuthStackScreen = ({navigation}) => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="OnboardingScreen" component={OnboardingScreen} />
    <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
    <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
  </AuthStack.Navigator>
);

export default AuthStackScreen;
