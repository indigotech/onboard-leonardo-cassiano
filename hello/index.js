/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Settings from './src/pages/Settings';
import {name as appName} from './app.json';
import { Navigation } from "react-native-navigation";

Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);
Navigation.registerComponent('Settings', () => Settings);

Navigation.events().registerAppLaunchedListener(() => {
   Navigation.setRoot({
     root: {
       stack: {
         children: [
           {
             component: {
               name: 'com.myApp.WelcomeScreen'
             }
           }
         ]
       }
     }
  });
});

AppRegistry.registerComponent(appName, () => App);
