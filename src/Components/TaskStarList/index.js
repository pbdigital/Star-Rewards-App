import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {LoadingIndicator} from '../LoadingIndicator';
import {TaskStarListItem} from './../ListItems/TaskStarListItem';
import {CloudBackgroundLeftOverRight} from './../ScreenBackground/CloudBackgrounds/Clouds/CloudBackgroundLeftOverRight';
import {Container, StarContainer} from './styles';
import {selectedDateToShowTaskSelector} from 'Redux';
import {useSelector} from 'react-redux';

const TaskStarList = ({tasks = []}) => {
  const isFocus = useIsFocused();
  const [layout, setLayout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRepositionStars, setRepositionStars] = useState(false);
  const selectedDateToShowTask = useSelector(selectedDateToShowTaskSelector);

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
