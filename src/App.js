/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MainStackNavigator} from './Navigations';
import {Provider} from 'react-redux';
import {store} from './Redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

// TODO: 
/**
 * Create signup screen
 * create login screen
 * separate authentication navigation
 * create new child functionality with token
 */
