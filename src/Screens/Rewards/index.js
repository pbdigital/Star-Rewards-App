import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  Dimensions,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {childActions} from '../../Redux/Child/ChildSlice';
import {
  childIdSelector,
  childNameSelector,
  childRewardsSelector,
  childStateIsLoadingSelector,
} from '../../Redux/Child/ChildSelectors';
import {Images} from '../../Assets/Images';
import {
  AppAlertModal,
  Button,
  Image,
  LoadingIndicator,
  RewardsListItem,
  RewardsToolbar,
  ScreenBackground,
  Text,
} from '../../Components';
import moment from 'moment';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  SuccessNotificationContainer,
  ConfirmAwardNotificationContainer,
} from './styles';
import {isEmpty} from 'lodash';
import {COLORS} from '../../Constants/Colors';
import ConfettiCannon from 'react-native-confetti-cannon';
import {NAV_ROUTES} from '../../Constants/Navigations';

const NEW_ITEM_BUTTON = {
  isAddItem: true,
};

const RewardsScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();

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
    <Text fontSize={16} fontWeight="400" lineHeight={28} textAlign="center">
      Celebrate your child’s progress{'\n'}with real life rewards
    </Text>
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
    console.log({payload});
    if (payload?.success) {
      setSuccessNotificationEmoji({
        emoji: selectedRewardToAward?.emoji,
        message: `You have successfully\nclaimed a ${name}!`,
      });
    } else {
      Alert.alert('Unable to award the reward. Please try again later.');
    }
    setSelectedRewardToAward(null);
  }, [childId, selectedRewardToAward, dispatch]);

  const handleOnPressListItem = useCallback(
    item => {
      if (isDeleteMode) {
        navigation.navigate(NAV_ROUTES.addRewards, {
          reward: item,
        });
        setIsDeleteMode(false);
        return;
      }
      setSelectedRewardToAward(item);
    },
    [isDeleteMode],
  );

  const handleOnRewardDeleted = item => {
    setIsDeleteMode(false);
  };

  const renderItem = useCallback(
    ({item}) => (
      <RewardsListItem
        item={item}
        onItemPress={handleOnPressListItem}
        isDeleteMode={isDeleteMode}
        onLongPress={() => setIsDeleteMode(!isDeleteMode)}
        onItemDeleted={handleOnRewardDeleted}
        onCloseDeleteConfirmationModal={() => setIsDeleteMode(false)}
      />
    ),
    [isDeleteMode],
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

  return (
    <>
      <ScreenBackground cloudType={0}>
        <RewardsToolbar
          hideAvatar
          title="Rewards"
          showBorderBottom
          // rightControlButton={
          //   <Image source={Images.IcClock} width={28} height={25} />
          // }
        />
        <TouchableOpacity
          onPress={() => setIsDeleteMode(false)}
          disabled={!isDeleteMode}
          style={{flex: 1}}>
          <FlatList
            data={[...rewards, NEW_ITEM_BUTTON]}
            contentContainerStyle={styles.listContainer}
            ListHeaderComponent={listHeader}
            numColumns={2}
            columnWrapperStyle={styles.listColumnWrapper}
            renderItem={renderItem}
          />
        </TouchableOpacity>
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
