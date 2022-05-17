import React from 'react';
import {NAV_ROUTES} from '../Constants/navigations';
import {
  ChildNameInputScreen,
  ChooseAvatarScreen,
  TasksScreen,
} from '../Screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Navigator
      initialRouteName={NAV_ROUTES.childNameInput}
      screenOptions={{headerShown: false}}>
      <Screen
        name={NAV_ROUTES.childNameInput}
        component={ChildNameInputScreen}
      />
      <Screen name={NAV_ROUTES.chooseAvatar} component={ChooseAvatarScreen} />
      <Screen name={NAV_ROUTES.tasks} component={TasksScreen} />
    </Navigator>
  );
};

export default MainStackNavigator;
