import React, {useMemo, useState, useEffect} from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {COLORS} from 'Constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  childIdSelector,
  childActions,
  completedTaskHistorySelector,
} from 'Redux';
import {CompletedtaskListItem} from '../ListItems';
import {Text} from '../Text';
import moment from 'moment';
import Modal from 'react-native-modal';

const Label = ({value}) => (
  <Text
    fontSize={14}
    fontWeight="500"
    lineHeight={21}
    marginBottom={14}
    marginLeft={20}
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
  }, [childId]);

  const getCompletedTaskHistory = async () => {
    setIsLoading(true);
    await dispatch(childActions.getCompletedTaskHistory({childId}));
    setIsLoading(false);
  };

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
            key={`${index}-${item?.id}-completed-task`}
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
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      {completedDatekeys && renderCompleted}
      <Modal
        isVisible={isLoading}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}>
        <ActivityIndicator />
      </Modal>
    </ScrollView>
  );
};

export {CompletedTask};
