import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {childActions} from '../../Redux/Child/ChildSlice';
import {
  childIdSelector,
  childRewardsSelector,
} from '../../Redux/Child/ChildSelectors';
import {Images} from '../../Assets/Images';
import {
  AppAlertModal,
  Image,
  LoadingIndicator,
  RewardsListItem,
  RewardsToolbar,
  ScreenBackground,
  Text,
} from '../../Components';
import moment from 'moment';
import {useRoute} from '@react-navigation/native';
import {SuccessNotificationContainer} from './styles';
import {isEmpty} from 'lodash';

const NEW_ITEM_BUTTON = {
  isAddItem: true,
};

const RewardsScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const {showAddSuccessNotification} = route.params || {};
  const childId = useSelector(childIdSelector);
  const rewards = useSelector(childRewardsSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [newlyAddedEmoji, setNewlyAddedEmoji] = useState('');

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
    setNewlyAddedEmoji(showAddSuccessNotification);
  }, [showAddSuccessNotification]);

  const listHeader = () => (
    <Text fontSize={16} fontWeight="400" lineHeight={28} textAlign="center">
      Celebrate your child’s progress{'\n'}with real life rewards
    </Text>
  );

  // todo acutally submit a reward
  const handleOnPressListItem = useCallback(
    async ({id: rewardId}) => {
      const {payload} = await dispatch(
        childActions.awardRewardToChild({
          childId,
          rewardId,
          date: moment().format('YYYY-MM-DD'),
        }),
      );
      console.log({payload})
      if (payload?.success) {
        console.log({payload})
        // show success notification
      } else {
        // show alert message
      }
    },
    [childId],
  );

  const renderItem = ({item}) => (
    <RewardsListItem item={item} onItemPress={handleOnPressListItem} />
  );

  const successNotification = useMemo(
    () => (
      <AppAlertModal
        isVisible={!isEmpty(newlyAddedEmoji)}
        onClose={() => setNewlyAddedEmoji(null)}>
        <SuccessNotificationContainer>
          <Text fontSize={90} lineHeight={100} textAlign="center">
            {newlyAddedEmoji}
          </Text>
          <Text
            fontSize={20}
            lineHeight={30}
            marginTop={10}
            fontWeight="600"
            textAlign="center">
            You have successfully{'\n'}added a reward!
          </Text>
        </SuccessNotificationContainer>
      </AppAlertModal>
    ),
    [newlyAddedEmoji],
  );

  return (
    <>
      <ScreenBackground cloudType={0}>
        <RewardsToolbar
          hideAvatar
          title="Rewards"
          showBorderBottom
          rightControlButton={
            <Image source={Images.IcClock} width={28} height={25} />
          }
        />
        <FlatList
          data={[...rewards, NEW_ITEM_BUTTON]}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={listHeader}
          numColumns={2}
          columnWrapperStyle={styles.listColumnWrapper}
          renderItem={renderItem}
        />
      </ScreenBackground>
      {isLoading && <LoadingIndicator />}
      {successNotification}
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
