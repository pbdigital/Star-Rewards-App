import React, {useEffect} from 'react';
import {NAV_ROUTES} from '../Constants/Navigations';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackNavigator} from './AuthStackNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {API} from '../Services/api';
import {userInforSelector} from '../Redux/User/UserSelectors';
import {RewardsStackNavigator} from './RewardsStackNavigator';
import {NewChildSetupStackNavigator} from './NewChildSetupStackNavigator';
import {childActions} from '../Redux/Child/ChildSlice';
import {userActions} from '../Redux/User/UserSlice';
import {SplashScreen} from '../Screens';

const {Navigator, Screen} = createNativeStackNavigator();

const MainStackNavigator = () => {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(userInforSelector);

  const getAllChildren = async () => {
    const {payload} = await dispatch(childActions.getAllChildren());
    const {children} = payload || {};
    if (children && children?.length > 0) {
      navigator.navigate(NAV_ROUTES.rewardsStackNavigator);
    } else {
      navigator.navigate(NAV_ROUTES.newChildSetupStackNavigator);
    }
    await dispatch(userActions.setIsLoading(false));
  };

  useEffect(() => {
    if (user?.token) {
      API.setHeader('Authorization', `Bearer ${user?.token}`);
      getAllChildren();
    } else {
      navigator.navigate(NAV_ROUTES.authNavigationStack);
    }
  }, [user]);

  return (
    <Navigator
      initialRouteName={NAV_ROUTES.splash}
      screenOptions={{headerShown: false}}>
      <Screen name={NAV_ROUTES.splash} component={SplashScreen} />
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
