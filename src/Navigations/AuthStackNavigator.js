import React from 'react';
import {NAV_ROUTES} from '../Constants/Navigations';
import {SignupScreen, LoginScreen} from '../Screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Navigator
      initialRouteName={NAV_ROUTES.login}
      screenOptions={{headerShown: false}}>
      <Screen name={NAV_ROUTES.signup} component={SignupScreen} />
      <Screen name={NAV_ROUTES.login} component={LoginScreen} />
    </Navigator>
  );
};

export {AuthStackNavigator};
