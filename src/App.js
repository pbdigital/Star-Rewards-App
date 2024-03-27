/* eslint-disable react-native/no-inline-styles */
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
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store, persistor} from './AppReduxState/store';
import {PersistGate} from 'redux-persist/integration/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {InAppPurchaseProvider, SelectProfileProvider} from 'ContextProviders';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <InAppPurchaseProvider>
            <SafeAreaProvider>
              <NavigationContainer>
                <SelectProfileProvider>
                  <BottomSheetModalProvider>
                    <MainStackNavigator />
                  </BottomSheetModalProvider>
                </SelectProfileProvider>
              </NavigationContainer>
            </SafeAreaProvider>
          </InAppPurchaseProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
