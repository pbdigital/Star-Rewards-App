import React from 'react';
import {NAV_ROUTES} from 'Constants';
import {AddBonusTaskScreen, BonusStarsScreen} from 'Screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator();

const BonusStarsStackNavitagor = () => {
  return (
    <Navigator
      initialRouteName={NAV_ROUTES.bonusStars}
      screenOptions={{headerShown: false}}>
      <Screen name={NAV_ROUTES.bonusStars} component={BonusStarsScreen} />
      <Screen name={NAV_ROUTES.addBonusTasks} component={AddBonusTaskScreen} />
    </Navigator>
  );
};

export {BonusStarsStackNavitagor};
