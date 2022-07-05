import React, {useCallback, useEffect} from 'react';
import {Image, Text} from 'Components';
import {Images} from 'Assets/Images';
import {Content, Container} from './styles';
import {COLORS} from 'Constants';
import {NAV_ROUTES} from 'Constants';
import {childActions, userInforSelector, userActions} from 'Redux';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {API} from 'Services/api';

const SplashScreen = () => {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(userInforSelector);

  const getAllChildren = useCallback(async () => {
    const {payload} = await dispatch(childActions.getAllChildren());
    const {children} = payload || {};
    if (children && children?.length > 0) {
      navigator.navigate(NAV_ROUTES.rewardsStackNavigator);
    } else {
      navigator.navigate(NAV_ROUTES.newChildSetupStackNavigator);
    }
    await dispatch(userActions.setIsLoading(false));
  }, [dispatch, navigator]);

  useEffect(() => {
    setTimeout(() => {
      if (user?.token) {
        API.setHeader('Authorization', `Bearer ${user?.token}`);
        getAllChildren();
      } else {
        navigator.navigate(NAV_ROUTES.authNavigationStack);
      }
    }, 500);
  }, [user, getAllChildren, navigator]);

  return (
    <Container source={Images.BgSplash}>
      <Content>
        <Image source={Images.Logo} width={200} height={200} />
        <Text
          fontSize={32}
          fontWeight="400"
          lineHeight={32}
          textAlign="center"
          marginTop={47}
          color={COLORS.White}>
          STAR REWARD
        </Text>
      </Content>
    </Container>
  );
};

export {SplashScreen};
