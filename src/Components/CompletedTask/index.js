/* eslint-disable react-hooks/exhaustive-deps */
import React, {useMemo, useState, useEffect, useCallback} from 'react';
import {RefreshControl, View} from 'react-native';
import {COLORS} from 'Constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  childIdSelector,
  childActions,
  completedTaskHistorySelector,
} from 'AppReduxState';
import {CompletedtaskListItem} from '../ListItems';
import {Text} from '../Text';
import moment from 'moment';
import {Root} from './styles';

const Label = ({value}) => (
  <Text
    fontSize={14}
    fontWeight="500"
    lineHeight={21}
    marginBottom={14}
    marginLeft={20}
    fontFamily="Poppins-Medium"
    color={COLORS.Text.black}>
    {value}
  </Text>
);

const CompletedTask = () => {
  const dispatch = useDispatch();
  const childId = useSelector(childIdSelector);
  const completedTasks = useSelector(completedTaskHistorySelector);
  const completedDatekeys = useMemo(() => {
    const keys = Object.keys(completedTasks || []);
    return keys;
  }, [completedTasks]);
  const [refTasksSwipeRow, setRefTasksSwipeRow] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCompletedTaskHistory();
  }, [childId, getCompletedTaskHistory]);

  const getCompletedTaskHistory = useCallback(async () => {
    setIsLoading(true);
    await dispatch(childActions.getCompletedTaskHistory({childId}));
    setIsLoading(false);
  }, [childId]);

  const closeRowExcept = (refSwipeTaskRow, activeIndex, taskIndex) => {
    refSwipeTaskRow?.forEach((swipeRowGroup, index) => {
      swipeRowGroup.forEach((itemSwipeRow, swipeRowGroupIndex) => {
        if (index === activeIndex && swipeRowGroupIndex === taskIndex) {
          return;
        }
        itemSwipeRow?.closeRow();
      });
    });
  };

  const renderCompleted = useMemo(() => {
    setRefTasksSwipeRow([]);
    return completedDatekeys.map((key, index) => {
      refTasksSwipeRow?.push([]);
      const task = completedTasks[key] || [];
      const renderItems = () => {
        return task.map((item, taskIndex) => (
          <CompletedtaskListItem
            {...item}
            ref={ref => refTasksSwipeRow[index].push(ref)}
            marginTop={0}
            marginBottom={16}
            hideCloseButton
            key={`${index}-${item?.id}-completed-task-item`}
            handleOnRowOpen={() => {
              closeRowExcept(refTasksSwipeRow, index, taskIndex);
            }}
          />
        ));
      };
      const marginTop = index === 0 ? 30 : 14;
      const dateFormat = 'Y-MM-DD';
      const today = moment().format(dateFormat);
      const yesterday = moment().subtract(1, 'day').format(dateFormat);

      let label = key;
      if (label === today) {
        label = 'Today';
      } else if (label === yesterday) {
        label = 'Yesterday';
      } else {
        label = moment(key).format('ddd, MMM DD, Y');
      }
      return (
        <View style={{marginTop}}>
          <Label value={label} />
          {renderItems()}
        </View>
      );
    });
  }, [completedDatekeys]);

  return (
    <Root
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={getCompletedTaskHistory}
        />
      }>
      {completedDatekeys && renderCompleted}
    </Root>
  );
};

export {CompletedTask};
