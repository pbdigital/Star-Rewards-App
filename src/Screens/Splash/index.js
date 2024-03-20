/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useRef} from 'react';
import {AppState} from 'react-native';
import {Image, Text} from 'Components';
import {Images} from 'Assets/Images';
import {Content, Container} from './styles';
import {COLORS} from 'Constants';
import {NAV_ROUTES} from 'Constants';
import {
  childActions,
  userInforSelector,
  userActions,
  selectedChildSelector,
} from 'AppReduxState';
import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {API} from 'Services/api';
import moment from 'moment';

const SplashScreen = () => {
  const navigator = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const user = useSelector(userInforSelector);
  const selectedChild = useSelector(selectedChildSelector);

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        refreshAppData();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    dispatch(
      childActions.setSelectedDateToShowTask(moment().format('MM-DD-YYYY')),
    );
  }, [dispatch]);

  const refreshAppData = useCallback(async () => {
    await dispatch(childActions.getAllChildren());
    await dispatch(
      childActions.getChildTasks({
        childId: selectedChild?.id,
        time: moment().format(),
      }),
    );
  }, [selectedChild]);

  const resetToNavigation = routeName => {
    navigator.dispatch(
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

  const getAllChildren = useCallback(async () => {
    const {payload} = await dispatch(childActions.getAllChildren());
    const {children} = payload || {};
    if (children && children?.length > 0) {
      resetToNavigation(NAV_ROUTES.bottomTabNavigator);
    } else {
      resetToNavigation(NAV_ROUTES.newChildSetupStackNavigator);
    }
    await dispatch(userActions.setIsLoading(false));
  }, [dispatch, navigator]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    setTimeout(() => {
      if (user?.token) {
        API.setHeader('Authorization', `Bearer ${user?.token}`);
        getAllChildren();
      } else {
        navigator.navigate(NAV_ROUTES.welcome);
        // navigator.dispatch(
        //   CommonActions.reset({
        //     index: 1,
        //     routes: [{name: NAV_ROUTES.welcome}],
        //   }),
        // );
        // navigator.navigate(NAV_ROUTES.authNavigationStack);
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
          STAR REWARDS
        </Text>
      </Content>
    </Container>
  );
};

export {SplashScreen};
