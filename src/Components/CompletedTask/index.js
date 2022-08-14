import React, {useMemo, useCallback, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {COLORS} from 'Constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  childIdSelector,
  childActions,
  completedTaskHistorySelector,
} from 'Redux';
import {CompletedtaskListItem} from '../ListItems';
import {Text} from '../Text';
import {Padded} from './styles';
import moment from 'moment';

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

  useEffect(() => {
    console.log({completedTasks});
  }, [completedTasks]);

  useEffect(() => {
    console.log({completedDatekeys});
  }, [completedDatekeys]);

  useEffect(() => {
    dispatch(childActions.getCompletedTaskHistory({childId}));
  }, [childId]);

  const renderCompleted = useCallback(
    (key, index) => {
      const task = completedTasks[key] || [];
      const renderItems = () => {
        return task.map((item, index) => (
          <CompletedtaskListItem {...item} marginTop={0} marginBottom={16} hideCloseButton />
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
        label = moment(key).format('MMM DD, Y');
      }
      return (
        <View style={{marginTop}}>
          <Label value={label} />
          {renderItems()}
        </View>
      );
    },
    [completedTasks]);

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      {completedDatekeys && completedDatekeys.map((key, index) => renderCompleted(key, index))}
    </ScrollView>
  );
};

export {CompletedTask};
