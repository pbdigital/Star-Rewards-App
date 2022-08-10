import React, {useMemo, useCallback, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {COLORS} from 'Constants';
import {SwipeRow} from 'react-native-swipe-list-view';
import {useDispatch, useSelector} from 'react-redux';
import {
  childIdSelector,
  childActions,
  completedTaskHistorySelector,
} from 'Redux';
import {CompletedtaskListItem} from '../ListItems';
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

const CompletedTask = () => {
  const dispatch = useDispatch();
  const childId = useSelector(childIdSelector);
  const completedTasks = useSelector(completedTaskHistorySelector);

  useEffect(() => {
    dispatch(childActions.getCompletedTaskHistory({childId}));
  }, [childId]);

  const openDeleteConfirmationModal = () => true;

  const renderItem = useCallback(({index, item}, rowMap) => {
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
  }, []);

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
    return completedTasks.map((item, index) => {
      return (
        <SwipeRow
          // ref={ref => refTasksSwipeRow?.push(ref)}
          key={`${item?.id}-rewards-tasks-history`}
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
  }, [completedTasks]);

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
