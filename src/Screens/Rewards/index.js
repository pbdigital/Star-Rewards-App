import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  Dimensions,
  StyleSheet,
  Alert,
  TouchableOpacity,
  View
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  childIdSelector,
  childNameSelector,
  childRewardsSelector,
  childStateIsLoadingSelector,
  childActions,
} from 'Redux';
import {
  AppAlertModal,
  Button,
  CurrentRewardGoal,
  Image,
  LoadingIndicator,
  RewardsListItem,
  RewardsToolbar,
  ScreenBackground,
  Text,
} from 'Components';
import moment from 'moment';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  SuccessNotificationContainer,
  ConfirmAwardNotificationContainer,
} from './styles';
import {isEmpty} from 'lodash';
import {COLORS} from 'Constants';
import ConfettiCannon from 'react-native-confetti-cannon';
import {NAV_ROUTES} from 'Constants';
import {doHapticFeedback, playSound} from 'Helpers';
import {Images} from 'src/Assets/Images';
import {useSelectProvider} from 'ContextProviders';

const NEW_ITEM_BUTTON = {
  isAddItem: true,
};

const RewardsScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const {startOpenAnimation} = useSelectProvider();

  const {showAddSuccessNotification} = route.params || {};
  const childId = useSelector(childIdSelector);
  const childName = useSelector(childNameSelector);
  const rewards = useSelector(childRewardsSelector);
  const childStateIsLoading = useSelector(childStateIsLoadingSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [isAwardingReward, seIsAwardingReward] = useState(false);
  const [successNotificationEmoji, setSuccessNotificationEmoji] = useState(null);
  const [selectedRewardToAward, setSelectedRewardToAward] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);

  useEffect(() => {
    dispatch(childActions.resetRewardsList());
    const getChildRewards = async () => {
      setIsLoading(true);
      await dispatch(
        childActions.getChildRewards({childId, time: moment().format()}),
      );
      setIsLoading(false);
    };

    getChildRewards();
  }, [childId]);

  useEffect(() => {
    if (showAddSuccessNotification) {
      setSuccessNotificationEmoji({
        emoji: showAddSuccessNotification,
        message: 'You have successfully\nadded a reward!',
      });
    }
  }, [showAddSuccessNotification]);

  const listHeader = () => (
    <>
      <Text fontSize={16} fontWeight="400" lineHeight={28} textAlign="center">
        Celebrate your child’s progress with real
        {'\n'}
        life rewards. Choose your goal reward
        {'\n'}
        by tapping the heart icon
      </Text>
      <View style={{marginTop: 30, marginBottom: 10}}>
        <CurrentRewardGoal />
      </View>
    </>
  );

  const awardRewardToChild = useCallback(async () => {
    const {id: rewardId, name} = selectedRewardToAward;
    seIsAwardingReward(true);
    const {payload} = await dispatch(
      childActions.awardRewardToChild({
        childId,
        rewardId,
        date: moment().format('YYYY-MM-DD'),
      }),
    );
    seIsAwardingReward(false);
    if (payload?.success) {
      setSuccessNotificationEmoji({
        emoji: selectedRewardToAward?.emoji,
        message: `You have successfully\nclaimed a ${name}!`,
      });
      setTimeout(() => playSound('award_reward_sound', 'mp3'), 500);
    } else {
      Alert.alert('Unable to award the reward. Please try again later.');
    }
    setSelectedRewardToAward(null);
  }, [childId, selectedRewardToAward, dispatch]);

  const handleOnPressListItem = useCallback(
    item => {
      doHapticFeedback();
      if (isDeleteMode) {
        navigation.navigate(NAV_ROUTES.addRewards, {
          reward: item,
        });
        setIsDeleteMode(false);
        return;
      }
      setSelectedRewardToAward(item);
    },
    [isDeleteMode, navigation],
  );

  const handleOnRewardDeleted = useCallback(item => {
    doHapticFeedback();
    setIsDeleteMode(false);
  }, []);

  const handleOnPressEditDeleteRewards = useCallback(() => {
    doHapticFeedback();
    setIsDeleteMode(!isDeleteMode);
  }, [isDeleteMode]);

  const setAsRewardGoal = useCallback(async params => {
    setIsLoading(true);
    const response = await dispatch(childActions.setRewardsGoal(params));
    setIsLoading(false);
    const {success} = response?.payload ?? {};
    if (!success) {
      Alert.alert(
        'Unable to set this reward as goal this time. Please try again later.',
      );
    }
  }, []);

  const removeAsRewardGoal = useCallback(async params => {
    setIsLoading(true);
    const response = await dispatch(childActions.removeAsRewardGoal(params));
    setIsLoading(false);
    const {success} = response?.payload ?? {};
    if (!success) {
      Alert.alert(
        'Unable to remove this reward as goal this time. Please try again later.',
      );
    }
  }, []);

  const renderItem = useCallback(
    ({item}) => {
      const handleOnPressMedalIcon = async () => {
        const {id: rewardsId, childId, is_goal: isGoal} = item;
        const params = {
          rewardsId,
          childId,
        };
        if (isGoal) {
          removeAsRewardGoal(params);
          return;
        }
        await setAsRewardGoal(params);
      };

      return (
        <RewardsListItem
          item={item}
          onItemPress={handleOnPressListItem}
          isDeleteMode={isDeleteMode}
          onItemDeleted={handleOnRewardDeleted}
          onCloseDeleteConfirmationModal={() => setIsDeleteMode(false)}
          onPressMedalIcon={handleOnPressMedalIcon}
        />
      );
    },
    [
      isDeleteMode,
      handleOnPressListItem,
      handleOnRewardDeleted,
      setAsRewardGoal,
      removeAsRewardGoal,
    ],
  );

  const successNotification = useMemo(
    () => (
      <AppAlertModal
        isVisible={!isEmpty(successNotificationEmoji)}
        onClose={() => setSuccessNotificationEmoji(null)}>
        <SuccessNotificationContainer>
          <Text fontSize={90} lineHeight={100} textAlign="center">
            {successNotificationEmoji?.emoji}
          </Text>
          <Text
            fontSize={20}
            lineHeight={30}
            marginTop={10}
            fontWeight="600"
            textAlign="center">
            {successNotificationEmoji?.message}
          </Text>
        </SuccessNotificationContainer>
      </AppAlertModal>
    ),
    [successNotificationEmoji],
  );

  const confirmAwardNotification = useMemo(
    () => (
      <AppAlertModal
        isVisible={!!selectedRewardToAward}
        onClose={() => setSelectedRewardToAward(null)}>
        <ConfirmAwardNotificationContainer>
          <Text fontSize={90} lineHeight={100} textAlign="center">
            {selectedRewardToAward?.emoji}
          </Text>
          <Text
            fontSize={20}
            lineHeight={30}
            marginTop={8}
            fontWeight="600"
            textAlign="center">
            Award {selectedRewardToAward?.name}?
          </Text>
          <Text
            fontSize={16}
            lineHeight={24}
            marginTop={8}
            fontWeight="400"
            textAlign="center"
            marginBottom={30}
            color={COLORS.Text.grey}>
            This will cost {childName} {selectedRewardToAward?.starsNeededToUnlock} stars
          </Text>
          <Button
            borderRadius={16}
            titleColor={COLORS.White}
            buttonColor={COLORS.Green}
            shadowColor={COLORS.GreenShadow}
            onPress={awardRewardToChild}
            title="Claim Reward"
            buttonTitleFontSize={16}
            disabled={isAwardingReward}
            isLoading={isAwardingReward}
          />
        </ConfirmAwardNotificationContainer>
      </AppAlertModal>
    ),
    [selectedRewardToAward, childName, isAwardingReward, awardRewardToChild],
  );

  const handleOnPressHistoryButton = () => {
    dispatch(childActions.resetHistoryData());
    navigation.navigate(NAV_ROUTES.history, {
      isRewards: true,
    });
  };

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
        <TouchableOpacity
          onPress={() => {
            doHapticFeedback();
            setIsDeleteMode(false);
          }}
          disabled={!isDeleteMode}
          style={styles.flex}>
          <FlatList
            data={[...rewards, NEW_ITEM_BUTTON]}
            contentContainerStyle={styles.listContainer}
            ListHeaderComponent={listHeader}
            numColumns={2}
            columnWrapperStyle={styles.listColumnWrapper}
            renderItem={renderItem}
          />
        </TouchableOpacity>
        {rewards?.length !== 0 && !isDeleteMode && (
          <TouchableOpacity onPress={handleOnPressEditDeleteRewards}>
            <Text
              fontSize={14}
              fontWeight="400"
              lineHeight={28}
              marginBottom={16}
              color={COLORS.Blue}
              textAlign="center"
              style={styles.footerEditDelete}>
              Edit or delete rewards
            </Text>
          </TouchableOpacity>
        )}
      </ScreenBackground>
      {(isLoading || childStateIsLoading) && <LoadingIndicator />}
      {successNotification}
      {confirmAwardNotification}
      {!isEmpty(successNotificationEmoji) && (
        <ConfettiCannon
          count={50}
          origin={{x: Dimensions.get('screen').width / 2, y: 0}}
          fadeOut={true}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  footerEditDelete: {
    fontStyle: 'italic',
  },
  listContainer: {
    flexGrow: 1,
    paddingTop: 16,
    paddingBottom: 30,
  },
  listColumnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 26,
  },
});

export {RewardsScreen};
