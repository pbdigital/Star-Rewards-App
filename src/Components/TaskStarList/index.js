import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {childIdSelector} from '../../Redux/Child/ChildSelectors';
import {childActions} from '../../Redux/Child/ChildSlice';
import {LoadingIndicator} from '../LoadingIndicator';
import {TaskStarListItem} from './../ListItems/TaskStarListItem';
import {CloudBackgroundLeftOverRight} from './../ScreenBackground/CloudBackgrounds/Clouds/CloudBackgroundLeftOverRight';
import {Container, StarContainer} from './styles';

const TaskStarList = ({tasks = []}) => {
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const childId = useSelector(childIdSelector);
  const [layout, setLayout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRepositionStars, setRepositionStars] = useState(false);

  useEffect(() => {
    repositionStars();
  }, [isFocus, repositionStars]);

  const handleOnLayout = ({nativeEvent}) => {
    console.log('STAR LIST CONTAINER LAYOUT', {nativeEvent});
    setLayout(nativeEvent?.layout);
  };

  const retreiveChildTasks = useCallback(async () => {
    setIsLoading(true);
    if (childId) {
      const payload = {
        childId,
        time: moment().format(),
      };
      await dispatch(childActions.getChildTasks(payload));
    }
    setIsLoading(false);
  }, [childId, dispatch]);

  useEffect(() => {
    retreiveChildTasks();
  }, [childId, retreiveChildTasks]);

  const repositionStars = useCallback(() => {
    setRepositionStars(true);
    setTimeout(() => setRepositionStars(false), 100);
  }, []);

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
              onTaskCompleted={repositionStars}
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
