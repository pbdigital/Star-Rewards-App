/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Image,
  LoadingIndicator,
  Rewards,
  RewardsToolbar,
  ScreenBackground,
} from 'Components';
import {useDispatch, useSelector} from 'react-redux';
import {
  childIdSelector,
  childListSelector,
  selectedChildSelector,
  userInforSelector,
  childActions,
} from 'Redux';
import {NAV_ROUTES} from 'Constants';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {Images} from 'src/Assets/Images';
import {useSelectProvider} from 'ContextProviders';

const StarRewardsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {startOpenAnimation} = useSelectProvider();
  const [isLoading, setIsLoading] = useState();
  const user = useSelector(userInforSelector);
  const childsList = useSelector(childListSelector);
  const selectedChild = useSelector(selectedChildSelector);
  const childId = useSelector(childIdSelector);

  useEffect(() => {
    if (childsList.length <= 0 && !selectedChild && user?.token) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: NAV_ROUTES.newChildSetupStackNavigator,
            params: {screen: NAV_ROUTES.childNameInput},
          },
        ],
      });
    }
  }, [navigation, childsList, selectedChild, dispatch, user]);

  const fetchAllChildren = useCallback(async () => {
    setIsLoading(true);
    const {payload} = await dispatch(childActions.getAllChildren());
    if (!payload?.success) {
      Alert.alert('Unable to retrive your child list. Please try again later.');
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    fetchAllChildren();
  }, []);

  const retreiveChildTasks = useCallback(async () => {
    setIsLoading(true);
    dispatch(childActions.setIsLoading(true));
    if (childId && isFocused) {
      dispatch(childActions.setResetChildTask());
      const payload = {
        childId,
        time: moment().format(),
      };
      await dispatch(childActions.getChildTasks(payload));
    }
    setIsLoading(false);
    dispatch(childActions.setIsLoading(false));
  }, [childId, isFocused, dispatch]);

  const retrieveChildRewards = useCallback(() => {
    const params = {childId, time: moment().format()};
    dispatch(childActions.getChildRewards(params));
  }, [childId, dispatch]);

  useEffect(() => {
    retreiveChildTasks();
    retrieveChildRewards();
  }, [childId, retreiveChildTasks, retrieveChildRewards]);

  const handleOnPressHistoryButton = () => {
    navigation.navigate(NAV_ROUTES.history);
  };

  const onRewardsRefresh = useCallback(() => {
    retreiveChildTasks();
    retrieveChildRewards();
    fetchAllChildren();
  }, [fetchAllChildren, retreiveChildTasks, retrieveChildRewards]);

  return (
    <>
      <ScreenBackground cloudType={0}>
        <RewardsToolbar
          rightControlButton={
            <TouchableOpacity onPress={handleOnPressHistoryButton}>
              <Image source={Images.IcClock} width={28} height={26} />
            </TouchableOpacity>
          }
          onPressSelectChild={startOpenAnimation}
        />
        <View style={styles.content}>
          <Rewards onRefresh={onRewardsRefresh} />
        </View>
      </ScreenBackground>
      {isLoading && <LoadingIndicator />}
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

export {StarRewardsScreen};
