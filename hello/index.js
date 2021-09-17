/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Settings from './src/pages/Settings';
import UserForms from './src/pages/UserForms';
import UserDetails from './src/pages/UserDetails';
import { Navigation } from 'react-native-navigation';

Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);
Navigation.registerComponent('Settings', () => Settings);
Navigation.registerComponent('UserForms', () => UserForms);
Navigation.registerComponent('Details',() => UserDetails);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'com.myApp.WelcomeScreen',
            },
          },
        ],
      },
    },
  });
});

AppRegistry.registerComponent(appName, () => App);
