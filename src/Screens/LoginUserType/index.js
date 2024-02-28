import React, {useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'Components';
import {useDispatch, useSelector} from 'react-redux';
import {childListSelector, userActions} from '../../Redux';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {NAV_ROUTES, USER_TYPE} from '../../Constants';

const LoginUserTypeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const children = useSelector(childListSelector);

  const resetToNavigation = routeName => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: routeName,
          },
        ],
      }),
    );
  };

  const handleLoginAsParent = useCallback(() => {
    dispatch(userActions.setAuthenticationType(USER_TYPE.parent));
    if (children && children?.length > 0) {
      resetToNavigation(NAV_ROUTES.bottomTabNavigator);
    } else {
      resetToNavigation(NAV_ROUTES.newChildSetupStackNavigator);
    }
  }, [children]);

  const handleLoginAsChild = useCallback(() => {
    dispatch(userActions.setAuthenticationType(USER_TYPE.child));
    resetToNavigation(NAV_ROUTES.loginChildSelector);
  }, []);

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text>Login Selector</Text>
      <TouchableOpacity onPress={handleLoginAsParent}>
        <Text>Parent</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLoginAsChild}>
        <Text>Child</Text>
      </TouchableOpacity>
    </View>
  );
};

export {LoginUserTypeScreen};
