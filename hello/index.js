/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import Settings from './src/pages/users-list';
import { UserFormsProvider } from './src/pages/user-forms';
import UserDetails from './src/pages/user-details';
import { Navigation } from 'react-native-navigation';

Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);
Navigation.registerComponent('Settings', () => Settings);
Navigation.registerComponent('UserForms', () => UserFormsProvider);
Navigation.registerComponent('Details', () => UserDetails);

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
