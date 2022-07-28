import React from 'react';
import {NAV_ROUTES} from 'Constants';
import {SignupScreen, LoginScreen, ResetPasswordScreen} from 'Screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Navigator
      initialRouteName={NAV_ROUTES.login}
      screenOptions={{headerShown: false}}>
      <Screen name={NAV_ROUTES.signup} component={SignupScreen} />
      <Screen name={NAV_ROUTES.login} component={LoginScreen} />
      <Screen name={NAV_ROUTES.resetPassword} component={ResetPasswordScreen} />
    </Navigator>
  );
};

export {AuthStackNavigator};
