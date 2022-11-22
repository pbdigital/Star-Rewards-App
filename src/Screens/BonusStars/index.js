import React, {useCallback, useEffect, useState} from 'react';
import {Alert, ImageStore, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  BonusRewards,
  LoadingIndicator,
  RewardsToolbar,
  ScreenBackground,
  SelectProfiles,
  Image,
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
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import { Images } from 'src/Assets/Images';

const BonusStarsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState();
  const [showProfileSelector, setShowProfileSelector] = useState(false);
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

  useEffect(() => {
    const fetchAllChildren = async () => {
      setIsLoading(true);
      const {payload} = await dispatch(childActions.getAllChildren());
      if (!payload?.success) {
        Alert.alert(
          'Unable to retrive your child list. Please try again later.',
        );
      }
      setIsLoading(false);
    };

    fetchAllChildren();
  }, []);

  const retreiveChildTasks = useCallback(async () => {
    setIsLoading(true);
    if (childId) {
      const payload = {
        childId,
        time: moment().format(),
      };
      await dispatch(childActions.getChildTasks(payload));
    }
    setIsLoading(false);
  }, [childId, dispatch]);

  useEffect(() => {
    retreiveChildTasks();
  }, [childId, retreiveChildTasks]);

  const closeProfileSelector = () => setShowProfileSelector(false);
  const openProfileSelector = () => setShowProfileSelector(true);
  const handleOnPressHistoryButton = () => {};

  return (
    <>
      <ScreenBackground cloudType={0}>
        <RewardsToolbar
          rightControlButton={
            <TouchableOpacity onPress={handleOnPressHistoryButton}>
              <Image source={Images.IcClock} width={28} height={26} />
            </TouchableOpacity>
          }
          onPressSelectChild={openProfileSelector}
        />
        <View style={styles.container}>
          <BonusRewards />
        </View>
      </ScreenBackground>
      <SelectProfiles
        isVisible={showProfileSelector}
        onCloseAnimation={closeProfileSelector}
      />
      {isLoading && <LoadingIndicator />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export {BonusStarsScreen};
