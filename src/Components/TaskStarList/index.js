import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {LoadingIndicator} from '../LoadingIndicator';
import {TaskStarListItem} from './../ListItems/TaskStarListItem';
import {CloudBackgroundLeftOverRight} from './../ScreenBackground/CloudBackgrounds/Clouds/CloudBackgroundLeftOverRight';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectedDateToShowTaskSelector,
  childIdSelector,
  childActions,
} from 'Redux';
import {ChildService} from 'Services';
import moment from 'moment';
import {getTaskPercentageCompleted} from 'Helpers';
import {chunk} from 'lodash';
import {GIVE_ONE_OFF_STAR_TYPE} from '../../Constants';
import {Container, StarContainer} from './styles';

const TaskStarList = ({tasks = [], showOneOffStar = false}) => {
  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  const [layout, setLayout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRepositionStars, setRepositionStars] = useState(false);
  const selectedDateToShowTask = useSelector(selectedDateToShowTaskSelector);
  const childId = useSelector(childIdSelector);
  const tasksByThrees = useMemo(() => {
    const giveOneStar = {
      type: GIVE_ONE_OFF_STAR_TYPE,
    };
    let taskChunk = chunk(tasks, 3);
    const lastIndex = taskChunk.length - 1;
    if (!showOneOffStar) return taskChunk;

    if (taskChunk[lastIndex].length === 3) {
      taskChunk = [...taskChunk, [giveOneStar]];
    } else {
      taskChunk[lastIndex].push(giveOneStar);
    }
    return taskChunk;
  }, [tasks]);

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

  const onTaskCompleted = useCallback(
    async ({isBonusTask}) => {
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
          if (!isBonusTask) {
            setTimeout(() => {
              dispatch(childActions.setCongratulateTaskCompleted(true));
            }, 1000);
          }
        }
        if (isBonusTask) {
          repositionStars(true);
        }
      }
    },
    [childId, selectedDateToShowTask, repositionStars, dispatch],
  );

  return (
    <Container onLayout={handleOnLayout}>
      <>
        {isLoading ? (
          <LoadingIndicator backgroundColor="transparent" />
        ) : isRepositionStars ? null : (
          tasksByThrees.map((threeTasks, threeTasksIndex) => (
            <StarContainer zIndex={9999 - threeTasksIndex}>
              {threeTasks.map((task, index) => (
                <TaskStarListItem
                  task={task}
                  key={`${task.name}-${task.id}-star-reward`}
                  indexPosition={index}
                  listContainerLayout={layout}
                  onTaskCompleted={onTaskCompleted}
                />
              ))}
            </StarContainer>
          ))
        )}
      </>
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
