//libs
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import './shim.js'
import { Provider } from 'react-redux';
import crypto from 'crypto'

// Components
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import Home from './src/pages/Home';
import Ship from './src/pages/Ship';
import ShipmentList from './src/pages/ShipmentList';
import QuickTools from './src/pages/QuickTools';
import Notification from './src/pages/Notification';
import ProductService from './src/pages/ProductService';
import Manage from './src/pages/Manage';
import Location from './src/pages/Location';
import Share from './src/pages/Share';
import ContactUs from './src/pages/ContactUs';
import AddBox from './src/pages/AddBox';

//Redux
import store from './src/config/store';
import AuthLoadingScreen from './src/pages/AuthLoadingScreen';

export const AppStack = createStackNavigator({ 
  Home: Home,
  Ship: Ship,
  ShipmentList: ShipmentList,
  QuickTools: QuickTools,
  Notification: Notification,
  ProductService: ProductService,
  Manage: Manage,
  Location: Location,
  Share: Share,
  ContactUs: ContactUs,
  AddBox: AddBox,
});

export const AuthStack = createStackNavigator(
  {
    Login: Login,
    Signup: Signup,
    Home: Home,    
  }
);

export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
// create a stack of our routes.
const AppStackNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

// create app container
const AppContainer = createAppContainer(AppStackNavigator);
