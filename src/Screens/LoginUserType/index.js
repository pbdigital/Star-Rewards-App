import React, {useCallback} from 'react';
import {Text, Image} from 'Components';
import {useDispatch, useSelector} from 'react-redux';
import {childListSelector, userActions} from '../../Redux';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {COLORS, NAV_ROUTES, USER_TYPE} from '../../Constants';
import {Images} from '../../Assets/Images';
import {Root, SelectorButton, SelectorText} from './styles';

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
    dispatch(userActions.setIsReadOnly(USER_TYPE.parent));
    if (children && children?.length > 0) {
      resetToNavigation(NAV_ROUTES.bottomTabNavigator);
    } else {
      resetToNavigation(NAV_ROUTES.newChildSetupStackNavigator);
    }
  }, [children]);

  const handleLoginAsChild = useCallback(() => {
    dispatch(userActions.setIsReadOnly(USER_TYPE.child));
    resetToNavigation(NAV_ROUTES.loginChildSelector);
  }, []);

  return (
    <Root>
      <Text
        fontWeight="400"
        fontSize={14}
        color={COLORS.Text.grey}
        marginBottom={8}>
        Welcome to Star Rewards
      </Text>
      <Text
        fontWeight="600"
        fontSize={22}
        lineHeight={32}
        marginBottom={40}
        color={COLORS.Text.black}>
        Who's Logging In Today?
      </Text>
      <SelectorButton onPress={handleLoginAsParent}>
        <Image source={Images.AccessParent} width={153} height={100} />
        <SelectorText>Login as a parent</SelectorText>
      </SelectorButton>
      <SelectorButton
        marginTop={20}
        borderColor={COLORS.Green}
        onPress={handleLoginAsChild}>
        <Image source={Images.AccessChild} width={90} height={100} />
        <SelectorText>Login as a child</SelectorText>
      </SelectorButton>
    </Root>
  );
};

export {LoginUserTypeScreen};
