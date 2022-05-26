import React, {useEffect} from 'react';
import {NAV_ROUTES} from '../Constants/Navigations';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackNavigator} from './AuthStackNavigator';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {API} from '../Services/api';
import {childIdSelector} from '../Redux/Child/ChildSelectors';
import {userInforSelector} from '../Redux/User/UserSelectors';
import {RewardsStackNavigator} from './RewardsStackNavigator';
import {NewChildSetupStackNavigator} from './NewChildSetupStackNavigator';

const {Navigator, Screen} = createNativeStackNavigator();

const MainStackNavigator = () => {
  const navigator = useNavigation();

  const user = useSelector(userInforSelector);
  const childId = useSelector(childIdSelector);

  useEffect(() => {
    if (user?.token) {
      API.setHeader('Authorization', `Bearer ${user?.token}`);
      if (childId) {
        navigator.navigate(NAV_ROUTES.tasks);
      } else {
        navigator.navigate(NAV_ROUTES.newChildSetupStackNavigator);
      }
    }
  }, [user, childId]);

  return (
    <Navigator
      initialRouteName={NAV_ROUTES.authNavigationStack}
      screenOptions={{headerShown: false}}>
      <Screen
        name={NAV_ROUTES.newChildSetupStackNavigator}
        component={NewChildSetupStackNavigator}
      />
      <Screen
        name={NAV_ROUTES.rewardsStackNavigator}
        component={RewardsStackNavigator}
      />
      <Screen
        name={NAV_ROUTES.authNavigationStack}
        component={AuthStackNavigator}
      />
    </Navigator>
  );
};

export {MainStackNavigator};
