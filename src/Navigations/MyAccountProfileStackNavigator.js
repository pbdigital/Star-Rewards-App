import React from 'react';
import {NAV_ROUTES} from '../Constants/Navigations';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SettingsMyAccountScreen,
  MyAccountUpdateNameScreen,
  MyAccountChangeEmailScreen,
  MyAccountChangePasswordScreen,
} from '../Screens';

const {Navigator, Screen} = createNativeStackNavigator();

const MyAccountProfileStackNavigator = () => {
  return (
    <Navigator
      initialRouteName={NAV_ROUTES.settingsMyAccount}
      screenOptions={{headerShown: false}}>
      <Screen
        name={NAV_ROUTES.settingsMyAccount}
        component={SettingsMyAccountScreen}
      />
      <Screen
        name={NAV_ROUTES.myAccountUpdateName}
        component={MyAccountUpdateNameScreen}
      />
      <Screen
        name={NAV_ROUTES.myAccountChangeEmail}
        component={MyAccountChangeEmailScreen}
      />
      <Screen
        name={NAV_ROUTES.myAccountChangePassword}
        component={MyAccountChangePasswordScreen}
      />
    </Navigator>
  );
};

export {MyAccountProfileStackNavigator};
