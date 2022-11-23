import React from 'react';
import {NAV_ROUTES} from 'Constants';
import {
  AddBonusTaskScreen,
  AddTasksScreen,
  ChooseAvatarScreen,
  SettingsScreen,
} from 'Screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator();

const SettingsStackNavigator = () => {
  return (
    <Navigator
      initialRouteName={NAV_ROUTES.settings}
      screenOptions={{headerShown: false}}>
      <Screen name={NAV_ROUTES.settings} component={SettingsScreen} />
      <Screen name={NAV_ROUTES.addBonusTasks} component={AddBonusTaskScreen} />
      <Screen name={NAV_ROUTES.addTasks} component={AddTasksScreen} />
      <Screen name={NAV_ROUTES.chooseAvatar} component={ChooseAvatarScreen} />
    </Navigator>
  );
};

export {SettingsStackNavigator};
