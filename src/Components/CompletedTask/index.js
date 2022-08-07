import { COLORS } from 'Constants';
import React, {useMemo, useCallback} from 'react';
import {ScrollView, View} from 'react-native';
import {SwipeRow} from 'react-native-swipe-list-view';
import {CompletedtaskListItem} from '../ListItems';
import {ListSwipeControlButtons} from '../ListSwipeControlButtons';
import { Text } from '../Text';
import {Padded} from './styles';

const MOCK_DATA = [
  {
    childId: 261,
    id: 670,
    isBonusTask: true,
    name: 'Test 1',
    starsAwarded: 1,
    daysofWeek: [1],
  },
  {
    childId: 261,
    id: 670,
    isBonusTask: true,
    name: 'Test 2',
    starsAwarded: 1,
    daysofWeek: [1, 4],
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

const CompletedTask = () => {
  const renderItem = useCallback(
    ({index, item}, rowMap) => {
      // const fromTaskList = item?.isBonusTask ? bonusTasks : rewardsTasks;
      // let isLast = index === fromTaskList.length - 1;
      return (
        <Padded>
          <CompletedtaskListItem
            {...item}
            hideCloseButton={true}
            marginTop={0}
            // marginBottom={isLast ? 0 : 16}
            marginBottom={16}
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
      <View>
        <Label value="Today" />
        {renderCompleted}
      </View>
      <View>
        <Label value="Yesterday" />
        {renderCompleted}
      </View>
    </ScrollView>
  );
};

export {CompletedTask};
