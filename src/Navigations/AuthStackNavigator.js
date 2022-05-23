import React from 'react';
import {NAV_ROUTES} from '../Constants/Navigations';
import {SignupScreen} from '../Screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Navigator
      initialRouteName={NAV_ROUTES.signup}
      screenOptions={{headerShown: false}}>
      <Screen name={NAV_ROUTES.signup} component={SignupScreen} />
    </Navigator>
  );
};

export {AuthStackNavigator};
