import React from 'react';
import {NAV_ROUTES} from 'Constants';
import {
  AddTasksScreen,
  ChildNameInputScreen,
  ChooseAvatarScreen,
  TasksScreen,
  WelcomeAboardScreen,
} from 'Screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator();

const NewChildSetupStackNavigator = () => {
  return (
    <Navigator
      initialRouteName={NAV_ROUTES.welcomeAboard}
      screenOptions={{headerShown: false}}>
      <Screen name={NAV_ROUTES.welcomeAboard} component={WelcomeAboardScreen} />
      <Screen
        name={NAV_ROUTES.childNameInput}
        component={ChildNameInputScreen}
      />
      <Screen name={NAV_ROUTES.chooseAvatar} component={ChooseAvatarScreen} />
      <Screen name={NAV_ROUTES.tasks} component={TasksScreen} />
      <Screen name={NAV_ROUTES.addTasks} component={AddTasksScreen} />
    </Navigator>
  );
};

export {NewChildSetupStackNavigator};
