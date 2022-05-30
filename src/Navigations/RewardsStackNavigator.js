import React from 'react';
import {NAV_ROUTES} from '../Constants/Navigations';
import {HomeScreen, AddBonusTaskScreen, AddTasksScreen, ChooseAvatarScreen} from '../Screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SettingsScreen} from '../Screens/Settings';

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
    </Navigator>
  );
};

export {RewardsStackNavigator};
