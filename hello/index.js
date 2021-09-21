/**
 * @format
 */

import React, { AppRegistry } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Settings from './src/pages/Settings';
import { UserForms } from './src/pages/UserForms';
import UserDetails from './src/pages/UserDetails';
import { Navigation } from 'react-native-navigation';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/client';

Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);
Navigation.registerComponent('Settings', () => Settings);
Navigation.registerComponent('UserForms', () => {
  return (props) => {
      <ApolloProvider client={client}>
        <UserForms {...props} />
      </ApolloProvider>
  };
});
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
