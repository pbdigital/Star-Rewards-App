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
import {store, persistor} from './Redux/store';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
