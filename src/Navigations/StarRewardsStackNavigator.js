import React from 'react';
import {NAV_ROUTES} from 'Constants';
import {StarRewardsScreen} from 'Screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator();

const StarRewardsStackNavigator = () => {
  return (
    <Navigator
      initialRouteName={NAV_ROUTES.starRewards}
      screenOptions={{headerShown: false}}>
      <Screen name={NAV_ROUTES.starRewards} component={StarRewardsScreen} />
    </Navigator>
  );
};

export {StarRewardsStackNavigator};
