import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Ship from './pages/Ship';
import ShipmentList from './pages/ShipmentList';
import AuthLoadingScreen from './pages/AuthLoadingScreen';

import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

export const AppStack = createStackNavigator({ 
  Home: Home,
  Ship: Ship,
  ShipmentList: ShipmentList
});

export const AuthStack = createStackNavigator({ SignIn: Login });

const AppNavigator = createStackNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    }
);

// // create a stack of our routes.
// const AppStackNavigator = createStackNavigator(
//   {
//     Login: Login,
//     SignupPersonal: SignupPersonal,
//     SignupCompany: SignupCompany,
//     Home: Home,    
//   },
//   {
//     initialRouteName: 'Login',
//   }
// );

// // create app container
export default createAppContainer(AppNavigator);