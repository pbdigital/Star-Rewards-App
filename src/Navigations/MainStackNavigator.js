import React, {useEffect} from 'react';
import {NAV_ROUTES} from '../Constants/Navigations';
import {
  ChildNameInputScreen,
  ChooseAvatarScreen,
  TasksScreen,
  AddTasksScreen,
  HomeScreen,
} from '../Screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackNavigator} from './AuthStackNavigator';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {API} from '../Services/api';

const {Navigator, Screen} = createNativeStackNavigator();

const MainStackNavigator = () => {
  const navigator = useNavigation();

  const user = useSelector(({user}) => user.info);
  const childId = useSelector(({child}) => child.childId);

  useEffect(() => {
    if (user?.token) {
      API.setHeader('Authorization', `Bearer ${user?.token}`);
      if (childId) {
        navigator.navigate(NAV_ROUTES.tasks);
      } else {
        navigator.navigate(NAV_ROUTES.childNameInput);
      }
    }
  }, [user, childId]);

  return (
    <Navigator
      initialRouteName={NAV_ROUTES.authNavigationStack}
      screenOptions={{headerShown: false}}>
      <Screen
        name={NAV_ROUTES.childNameInput}
        component={ChildNameInputScreen}
      />
      <Screen name={NAV_ROUTES.chooseAvatar} component={ChooseAvatarScreen} />
      <Screen name={NAV_ROUTES.tasks} component={TasksScreen} />
      <Screen name={NAV_ROUTES.addTasks} component={AddTasksScreen} />
      <Screen name={NAV_ROUTES.home} component={HomeScreen} />
      <Screen
        name={NAV_ROUTES.authNavigationStack}
        component={AuthStackNavigator}
      />
    </Navigator>
  );
};

export {MainStackNavigator};
