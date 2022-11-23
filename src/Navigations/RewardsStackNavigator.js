import React from 'react';
import {NAV_ROUTES} from 'Constants';
import {RewardsScreen, AddRewardScreen} from 'Screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator();

const RewardsStackNavigator = () => {
  return (
    <Navigator
      initialRouteName={NAV_ROUTES.rewards}
      screenOptions={{headerShown: false}}>
      <Screen name={NAV_ROUTES.rewards} component={RewardsScreen} />
      <Screen name={NAV_ROUTES.addRewards} component={AddRewardScreen} />
    </Navigator>
  );
};

export {RewardsStackNavigator};
