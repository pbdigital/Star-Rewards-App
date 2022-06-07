import React from 'react';
import {StyleSheet} from 'react-native';
import {TaskStarListItem} from './../ListItems/TaskStarListItem';
import {CloudBackgroundLeftOverRight} from './../ScreenBackground/CloudBackgrounds/Clouds/CloudBackgroundLeftOverRight';
import {Container, StarContainer} from './styles';

const TaskStarList = ({tasks = []}) => {
  return (
    <Container>
      <StarContainer>
        {tasks.map((task, index) => (
          <TaskStarListItem
            task={task}
            key={`${task.name}-${task.id}-star-reward`}
            indexPosition={index}
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
  cloudBackground: {
    position: 'absolute',
    top: 96,
  },
});

export {TaskStarList};
