import React from 'react';
import {NAV_ROUTES} from '../Constants/Navigations';
import {HomeScreen} from '../Screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator();

const RewardsStackNavigator = () => {
  return (
    <Navigator
      initialRouteName={NAV_ROUTES.home}
      screenOptions={{headerShown: false}}>
      <Screen name={NAV_ROUTES.home} component={HomeScreen} />
    </Navigator>
  );
};

export {RewardsStackNavigator};
