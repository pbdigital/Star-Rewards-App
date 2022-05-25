import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {TaskStarListItem} from './../ListItems/TaskStarListItem';
import {CloudBackgroundLeftOverRight} from './../ScreenBackground/CloudBackgrounds/Clouds/CloudBackgroundLeftOverRight';
import {STAR_POSITIONS} from './../../Constants/StarPositions';
import {Container, StarContainer} from './styles';

const TaskStarList = () => {
  const tasks = useSelector(({child}) => child.tasks);
  return (
    <Container>
      <StarContainer>
        {tasks.map((task, index) => (
          <TaskStarListItem
            task={task}
            contentContainerStyle={[styles.absolute, STAR_POSITIONS[index]]}
            key={`${task.name}-${task.id}-star-reward`}
          />
        ))}
      </StarContainer>
      <CloudBackgroundLeftOverRight
        contentContainerStyle={styles.cloudBackground}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
  cloudBackground: {
    position: 'absolute',
    top: 96,
  },
});

export {TaskStarList};
