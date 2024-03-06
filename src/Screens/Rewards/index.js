/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  Dimensions,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  childIdSelector,
  childNameSelector,
  childRewardsSelector,
  childStateIsLoadingSelector,
  childActions,
  isReadOnlySelector,
} from 'Redux';
import {
  AppAlertModal,
  Button,
  CurrentRewardGoal,
  EmptyListState,
  HistoryButton,
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
  AvatarWelcomeContainer,
  Footer,
} from './styles';
import {isEmpty} from 'lodash';
import {COLORS, HISTORY_TAB, SCREEN_HELP_MESSAGES} from 'Constants';
import ConfettiCannon from 'react-native-confetti-cannon';
import {NAV_ROUTES} from 'Constants';
import {doHapticFeedback, playSound} from 'Helpers';
import {Images} from 'src/Assets/Images';
import {useSelectProvider} from 'ContextProviders';
import {HelpModal, PageHeaderTitle} from '../../Components';

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
  const isReadOnly = useSelector(isReadOnlySelector);
  const [isLoading, setIsLoading] = useState(false);
  const [isAwardingReward, seIsAwardingReward] = useState(false);
  const [successNotificationEmoji, setSuccessNotificationEmoji] =
    useState(null);
  const [selectedRewardToAward, setSelectedRewardToAward] = useState(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const getChildRewards = useCallback(async () => {
    setIsLoading(true);
    await dispatch(
      childActions.getChildRewards({childId, time: moment().format()}),
    );
    setIsLoading(false);
  }, [childId]);

  const fetchAllChildren = useCallback(async () => {
    setIsLoading(true);
    const {payload} = await dispatch(childActions.getAllChildren());
    if (!payload?.success) {
      Alert.alert('Unable to retrive your child list. Please try again later.');
    }
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    dispatch(childActions.resetRewardsList());
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

  const helpModalClose = () => setShowHelpModal(false);
  const helpModalOpen = () => setShowHelpModal(true);

  const listHeader = useCallback(
    () => (
      <>
        {renderPageHeaderTitle()}
        <CurrentRewardGoal
          onPressMedalIcon={removeAsRewardGoal}
          contentContainerStyle={styles.currentRewardGoalContainer}
          onPressClaimReward={item => setSelectedRewardToAward(item)}
        />
      </>
    ),
    [isReadOnly],
  );

  const listFooter = useCallback(() => {
    if (isReadOnly) {
      return <View style={styles.readOnlyListFooter} />;
    }
    if (rewards?.length !== 0 && !isDeleteMode) {
      return (
        <TouchableOpacity onPress={handleOnPressEditDeleteRewards}>
          <Text
            fontSize={14}
            fontWeight="400"
            lineHeight={28}
            marginTop={16}
            marginBottom={16}
            color={COLORS.Blue}
            textAlign="center"
            style={styles.footerEditDelete}>
            Edit or delete rewards
          </Text>
        </TouchableOpacity>
      );
    }
    return null;
  }, [isReadOnly]);

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
      if (isReadOnly) return;
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
    [isDeleteMode, navigation, isReadOnly],
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
        // eslint-disable-next-line no-shadow
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
          key={`reward-list-item-${item?.rewardsId}`}
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
            This will cost {childName}{' '}
            {selectedRewardToAward?.starsNeededToUnlock} stars
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

  const renderPageHeaderTitle = () => (
    <PageHeaderTitle
      title="Rewards"
      subTitle="Celebrate your child’s progress with real life rewards. Choose a goal reward by tapping the ribbon icon"
      onPressHelpButton={helpModalOpen}
    />
  );

  const renderEmptyState = useCallback(() => {
    const addReward = () => {
      doHapticFeedback();
      navigation.navigate(NAV_ROUTES.addRewards);
    };

    return (
      <ScrollView
        contentContainerStyle={styles.emptyRootContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <AvatarWelcomeContainer>
          {renderPageHeaderTitle()}
          <EmptyListState
            message="Celebrate every step of your child's journey with real-life rewards that make their accomplishments soar higher."
            footerNote={
              isReadOnly
                ? ''
                : "Craft rewards that reflect your heart's desires, shaping the sky with dreams that sparkle as bright as the stars. And if you have a special goal in mind, just tap the ribbon icon to choose a reward that's extra-magical."
            }
            starImage={
              <Image source={Images.NoRewardsStar} height={160} width={143} />
            }
            containerFlex={1}
            contentContainerStyle={styles.emptyStateContainer}
          />
          {!isReadOnly && (
            <Footer>
              <Button
                borderRadius={16}
                titleColor={COLORS.White}
                buttonColor={COLORS.Blue}
                shadowColor={COLORS.BlueShadow}
                onPress={addReward}
                title="Add Reward"
                buttonTitleFontSize={16}
                leftIcon={
                  <Image source={Images.IcAdd} width={24} height={24} />
                }
              />
            </Footer>
          )}
        </AvatarWelcomeContainer>
      </ScrollView>
    );
  }, [isReadOnly]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAllChildren();
    await getChildRewards();
    setTimeout(() => setRefreshing(false), 300);
  }, []);

  return (
    <>
      <ScreenBackground cloudType={0}>
        <RewardsToolbar
          rightControlButton={<HistoryButton tab={HISTORY_TAB.rewards} />}
          onPressSelectChild={startOpenAnimation}
        />
        {rewards.length ? (
          <TouchableOpacity
            onPress={() => {
              doHapticFeedback();
              setIsDeleteMode(false);
            }}
            disabled={!isDeleteMode}
            style={styles.flex}>
            <FlatList
              data={isReadOnly ? rewards : [...rewards, NEW_ITEM_BUTTON]}
              contentContainerStyle={styles.listContainer}
              ListHeaderComponent={listHeader}
              numColumns={2}
              columnWrapperStyle={styles.listColumnWrapper}
              renderItem={renderItem}
              ListFooterComponent={listFooter}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </TouchableOpacity>
        ) : (
          renderEmptyState()
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
      <HelpModal
        title={SCREEN_HELP_MESSAGES.rewards.title}
        content={SCREEN_HELP_MESSAGES.rewards.message}
        headerImage={
          <Image
            source={SCREEN_HELP_MESSAGES.rewards.headerImage.source}
            width={SCREEN_HELP_MESSAGES.rewards.headerImage.width}
            height={SCREEN_HELP_MESSAGES.rewards.headerImage.height}
            resizeMode="contain"
          />
        }
        isVisible={showHelpModal}
        onClose={helpModalClose}
      />
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
    paddingTop: 10,
  },
  listColumnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 26,
  },
  currentRewardGoalContainer: {
    marginTop: 30,
    marginBottom: 10,
  },
  cloudImageRight: {
    position: 'absolute',
    top: 0,
    right: -25,
  },
  cloudImageLeft: {
    position: 'absolute',
    top: 170,
    left: 0,
  },
  welcomeText: {
    position: 'absolute',
    top: 55,
    left: 0,
    width: '100%',
  },
  emptyStateContainer: {
    marginVertical: 20,
  },
  emptyRootContainer: {
    flexGrow: 1,
  },
  readOnlyListFooter: {
    paddingBottom: 20,
  },
});

export {RewardsScreen};
