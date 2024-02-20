import React from 'react';
import {NAV_ROUTES} from 'Constants';
import {SetbacksScreen} from 'Screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator();

const StarSetbackStackNavigator = () => {
  return (
    <Navigator
      initialRouteName={NAV_ROUTES.settings}
      screenOptions={{headerShown: false}}>
      <Screen name={NAV_ROUTES.setbacks} component={SetbacksScreen} />
    </Navigator>
  );
};

export {StarSetbackStackNavigator};
