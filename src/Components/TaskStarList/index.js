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
  isReadOnlySelector,
} from 'Redux';
import {ChildService} from 'Services';
import moment from 'moment';
import {getTaskPercentageCompleted} from 'Helpers';
import {chunk} from 'lodash';
import {LIST_TYPE} from '../../Constants';
import {Container, StarContainer} from './styles';
import {
  childBonusStarViewTypeSelector,
  childStarViewTypeSelector,
} from '../../Redux';

const TaskStarList = ({tasks = [], showOneOffStar = false, type}) => {
  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  const [layout, setLayout] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [isRepositionStars, setRepositionStars] = useState(false);
  const selectedDateToShowTask = useSelector(selectedDateToShowTaskSelector);
  const childId = useSelector(childIdSelector);
  const starsViewListType = useSelector(childStarViewTypeSelector);
  const bonusStarsViewListType = useSelector(childBonusStarViewTypeSelector);
  const isReadOnly = useSelector(isReadOnlySelector);

  const showList = useMemo(() => {
    console.log({starsViewListType, type, bonusStarsViewListType});
    if (type === 'rewards') {
      return starsViewListType === LIST_TYPE.list;
    }
    return bonusStarsViewListType === LIST_TYPE.list;
  }, [starsViewListType, bonusStarsViewListType, type]);

  const tasksByThrees = useMemo(() => chunk(tasks, 3), [tasks]);

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

  if (showList) {
    return (
      <Container onLayout={handleOnLayout}>
        <>
          {isLoading ? (
            <LoadingIndicator backgroundColor="transparent" />
          ) : (
            tasks.map((task, index) => {
              return (
                <TaskStarListItem
                  task={task}
                  key={`${task.name}-${task.id}-star-reward`}
                  indexPosition={index}
                  listContainerLayout={layout}
                  onTaskCompleted={onTaskCompleted}
                  type={LIST_TYPE.list}
                  starType={type}
                />
              );
            })
          )}
        </>
      </Container>
    );
  }

  return (
    <Container onLayout={handleOnLayout}>
      <>
        {isLoading ? (
          <LoadingIndicator backgroundColor="transparent" />
        ) : isRepositionStars ? null : (
          tasksByThrees.map((threeTasks, threeTasksIndex) => (
            <StarContainer
              zIndex={9999 - threeTasksIndex}
              key={`star-reward-container-${threeTasksIndex}`}>
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
