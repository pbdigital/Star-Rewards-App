import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'Components';
import {useDispatch, useSelector} from 'react-redux';
import {childActions, childListSelector} from '../../Redux';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {NAV_ROUTES} from '../../Constants';

const LoginChildSelectorScreen = () => {
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

  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text>Login Child Selector</Text>
      {children.map(child => {
        const handleSelectChild = () => {
          dispatch(childActions.setSelectedChild(child));
          resetToNavigation(NAV_ROUTES.bottomTabNavigator);
        };
        console.log({child});
        return (
          <TouchableOpacity onPress={handleSelectChild}>
            <Text>{child.firstName}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export {LoginChildSelectorScreen};
