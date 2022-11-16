import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {LoadingIndicator} from '../LoadingIndicator';
import {TaskStarListItem} from './../ListItems/TaskStarListItem';
import {CloudBackgroundLeftOverRight} from './../ScreenBackground/CloudBackgrounds/Clouds/CloudBackgroundLeftOverRight';
import {Container, StarContainer} from './styles';
import {selectedDateToShowTaskSelector} from 'Redux';
import {useDispatch, useSelector} from 'react-redux';
import {childIdSelector, childActions} from 'Redux';
import {ChildService} from 'Services';
import moment from 'moment';
import {getTaskPercentageCompleted} from 'Helpers';

const TaskStarList = ({tasks = []}) => {
  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  const [layout, setLayout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRepositionStars, setRepositionStars] = useState(false);
  const selectedDateToShowTask = useSelector(selectedDateToShowTaskSelector);
  const childId = useSelector(childIdSelector);

  useEffect(() => {
    repositionStars();
  }, [isFocus, repositionStars]);

  const handleOnLayout = ({nativeEvent}) => {
    console.log('STAR LIST CONTAINER LAYOUT', {nativeEvent});
    setLayout(nativeEvent?.layout);
  };

  const repositionStars = useCallback(() => {
    setRepositionStars(true);
    setTimeout(() => setRepositionStars(false), 100);
  }, []);

  useEffect(() => {
    repositionStars();
  }, [selectedDateToShowTask, repositionStars]);

  const onTaskCompleted = useCallback(async () => {
    const payload = {
      childId,
      time: moment().format(),
    };
    const {data} = await ChildService.getChildTasks(payload);
    const {success, tasks: childTasks} = data || {};
    if (success && childTasks) {
      const percentage = getTaskPercentageCompleted({
        tasks: childTasks,
        date: moment(selectedDateToShowTask, 'MM-DD-YYYY'),
      });
      if (percentage === 100) {
        dispatch(childActions.getChildTasks(payload));
        setTimeout(() => {
          dispatch(childActions.setCongratulateTaskCompleted(true));
        }, 500);
      }
    }
  }, [childId]);

  return (
    <Container onLayout={handleOnLayout}>
      <StarContainer>
        {isLoading ? (
          <LoadingIndicator backgroundColor="transparent" />
        ) : isRepositionStars ? null : (
          tasks.map((task, index) => (
            <TaskStarListItem
              task={task}
              key={`${task.name}-${task.id}-star-reward`}
              indexPosition={index}
              listContainerLayout={layout}
              onTaskCompleted={onTaskCompleted}
            />
          ))
        )}
      </StarContainer>
      <CloudBackgroundLeftOverRight
        contentContainerStyle={styles.cloudBackground}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  cloudBackground: {
    position: 'absolute',
    top: 96,
  },
});

export {TaskStarList};
