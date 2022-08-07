import { COLORS } from 'Constants';
import React, {useMemo, useCallback} from 'react';
import {ScrollView, View} from 'react-native';
import {SwipeRow} from 'react-native-swipe-list-view';
import {RewardsHistoryListItem} from '../ListItems';
import {ListSwipeControlButtons} from '../ListSwipeControlButtons';
import {Text} from '../Text';
import {Padded} from './styles';

const MOCK_DATA = [
  {
    id: '669',
    name: 'Test 1',
    childId: '244',
    emoji: '😁',
    starsNeededToUnlock: '3',
    date: '4/30/2022',
  },
  {
    id: '669',
    name: 'Test 2',
    childId: '244',
    emoji: '😁',
    starsNeededToUnlock: '4',
    date: '6/3/2022',
  },
  {
    id: '669',
    name: 'Test 3',
    childId: '244',
    emoji: '😁',
    starsNeededToUnlock: '3',
    date: '6/10/2022',
  },
];

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
            // onPressDangerButton={openDeleteConfirmationModal}
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
    return MOCK_DATA.map((item, index) => {
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
  }, [MOCK_DATA]);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{marginTop: 30}}>{renderCompleted}</View>
    </ScrollView>
  );
};

export {RewardsHistory};
