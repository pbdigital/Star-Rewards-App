import React, {useMemo, useCallback, useEffect} from 'react';
import {COLORS} from 'Constants';
import {ScrollView, View} from 'react-native';
import {SwipeRow} from 'react-native-swipe-list-view';
import {useDispatch, useSelector} from 'react-redux';
import {childActions, childIdSelector, rewardsHistorySelector} from 'Redux';
import {RewardsHistoryListItem} from '../ListItems';
import {ListSwipeControlButtons} from '../ListSwipeControlButtons';
import {Text} from '../Text';
import {Padded} from './styles';

const Label = ({value}) => (
  <Text
    fontSize={14}
    fontWeight="500"
    lineHeight={21}
    marginBottom={14}
    marginLeft={20}
    marginTop={30}
    color={COLORS.Text.black}>
    {value}
  </Text>
);

const RewardsHistory = () => {
  const dispatch = useDispatch();
  const childId = useSelector(childIdSelector);
  const rewardsHistory = useSelector(rewardsHistorySelector);
  const openDeleteConfirmationModal = () => true;

  useEffect(() => {
    dispatch(childActions.getRewardsHistory({childId}));
  }, [childId]);

  const renderItem = useCallback(
    ({index, item}, rowMap) => {
      // const fromTaskList = item?.isBonusTask ? bonusTasks : rewardsTasks;
      // let isLast = index === fromTaskList.length - 1;
      return (
        <Padded>
          <RewardsHistoryListItem
            {...item}
            hideCloseButton={true}
            marginTop={0}
            // marginBottom={isLast ? 0 : 16}
            marginBottom={20}
          />
        </Padded>
      );
    },
    [
      // bonusTasks, rewardsTasks
    ],
  );

  const renderHiddenItem = useCallback(
    ({item}, rowMap) => {
      return (
        <Padded>
          <ListSwipeControlButtons
            key={`${item.id}-completed-task`}
            item={item}
            hideNeutralButton={true}
            onPressDangerButton={openDeleteConfirmationModal}
          />
        </Padded>
      );
    },
    [
      // handleOnPressEditButton
    ],
  );
  const renderCompleted = useMemo(() => {
    // setRefTasksSwipeRow([]);
    // rewardsHistory
    const keys = Object.keys(rewardsHistory);
    const extractedRewardHistories = Object.values(rewardsHistory).reduce(
      (prev, cur) => {
        return [...prev, ...cur];
      },
      [],
    );
    return extractedRewardHistories.map((item, index) => {
      return (
        <SwipeRow
          // ref={ref => refTasksSwipeRow?.push(ref)}
          key={`${item?.id}-rewards-tasks`}
          rightOpenValue={-70}
          leftOpenValue={0}
          // onRowPress={() => handleOnPressEditButton(item)}
          onRowOpen={() => {
            // closeRowExcept(refTasksSwipeRow, index);
            // closeRowExcept(refBonusTasksSwipeRow, null);
          }}>
          {renderHiddenItem({item})}
          {renderItem({item, index})}
        </SwipeRow>
      );
    });
  }, [rewardsHistory]);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{marginTop: 30}}>{renderCompleted}</View>
    </ScrollView>
  );
};

export {RewardsHistory};
