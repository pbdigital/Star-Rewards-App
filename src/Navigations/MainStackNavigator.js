import React from 'react';
import {NAV_ROUTES} from 'Constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackNavigator} from './AuthStackNavigator';
import {NewChildSetupStackNavigator} from './NewChildSetupStackNavigator';
import {
  HistoryScreen,
  SplashScreen,
  AddSetbackBehaviorScreen,
  StarsAdjustmentDetailsScreen,
  StarsAdjustmentFormScreen,
} from 'Screens';
import {BottomTabNavigator} from './BottomTabNavigator';
import {MyAccountProfileStackNavigator} from './MyAccountProfileStackNavigator';

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
        name={NAV_ROUTES.authNavigationStack}
        component={AuthStackNavigator}
      />
      <Screen
        name={NAV_ROUTES.bottomTabNavigator}
        component={BottomTabNavigator}
      />
      <Screen name={NAV_ROUTES.history} component={HistoryScreen} />
      <Screen
        name={NAV_ROUTES.myAccountProfileStackNavigator}
        component={MyAccountProfileStackNavigator}
      />
      <Screen
        name={NAV_ROUTES.addSetbackBehaviorScreen}
        component={AddSetbackBehaviorScreen}
      />
      <Screen
        name={NAV_ROUTES.starsAdjustmentDetails}
        component={StarsAdjustmentDetailsScreen}
      />
      <Screen
        name={NAV_ROUTES.starsAdjustmentForm}
        component={StarsAdjustmentFormScreen}
      />
    </Navigator>
  );
};

export {MainStackNavigator};
