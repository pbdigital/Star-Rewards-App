import React from 'react';
import {NAV_ROUTES} from 'Constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackNavigator} from './AuthStackNavigator';
import {RewardsStackNavigator} from './RewardsStackNavigator';
import {NewChildSetupStackNavigator} from './NewChildSetupStackNavigator';
import {SplashScreen} from 'Screens';
import {BottomTabNavigator} from './BottomTabNavigator';

const {Navigator, Screen} = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Navigator
      initialRouteName={NAV_ROUTES.splash}
      screenOptions={{headerShown: false}}>
      <Screen name={NAV_ROUTES.splash} component={SplashScreen} />
      <Screen
        name={NAV_ROUTES.newChildSetupStackNavigator}
        component={NewChildSetupStackNavigator}
      />
      <Screen
        name={NAV_ROUTES.rewardsStackNavigator}
        component={RewardsStackNavigator}
      />
      <Screen
        name={NAV_ROUTES.authNavigationStack}
        component={AuthStackNavigator}
      />
      <Screen
        name={NAV_ROUTES.bottomTabNavigator}
        component={BottomTabNavigator}
      />
    </Navigator>
  );
};

export {MainStackNavigator};
