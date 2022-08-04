import React from 'react';
import {NAV_ROUTES} from 'Constants';
import {
  HomeScreen,
  AddBonusTaskScreen,
  AddTasksScreen,
  ChooseAvatarScreen,
  RewardsScreen,
  AddRewardScreen,
  SettingsScreen,
  HistoryScreen,
} from 'Screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MyAccountProfileStackNavigator} from './MyAccountProfileStackNavigator';

const {Navigator, Screen} = createNativeStackNavigator();

const RewardsStackNavigator = () => {
  return (
    <Navigator
      initialRouteName={NAV_ROUTES.home}
      screenOptions={{headerShown: false}}>
      <Screen name={NAV_ROUTES.home} component={HomeScreen} />
      <Screen name={NAV_ROUTES.addBonusTasks} component={AddBonusTaskScreen} />
      <Screen name={NAV_ROUTES.settings} component={SettingsScreen} />
      <Screen name={NAV_ROUTES.addTasks} component={AddTasksScreen} />
      <Screen name={NAV_ROUTES.chooseAvatar} component={ChooseAvatarScreen} />
      <Screen name={NAV_ROUTES.rewards} component={RewardsScreen} />
      <Screen name={NAV_ROUTES.addRewards} component={AddRewardScreen} />
      <Screen
        name={NAV_ROUTES.myAccountProfileStackNavigator}
        component={MyAccountProfileStackNavigator}
      />
      <Screen name={NAV_ROUTES.history} component={HistoryScreen} />
    </Navigator>
  );
};

export {RewardsStackNavigator};
