import React from 'react';
import {StyleSheet} from 'react-native';
import {TaskStarListItem} from './../ListItems/TaskStarListItem';
import {CloudBackgroundLeftOverRight} from './../ScreenBackground/CloudBackgrounds/Clouds/CloudBackgroundLeftOverRight';
import {Container, StarContainer} from './styles';

const TASKS = [
  {
    name: 'Brush teeth',
  },
  {
    name: 'Make Bed',
  },
  {
    name: 'Do you homework',
  },
  {
    name: 'Get ready for school',
  },
  {
    name: 'Put away toys asdf asfasd asd asdf asda sfasdf',
  },
];

const StarPosition = [
  {
    top: 0,
    left: 0,
  },
  {
    top: 0,
    right: 0,
  },
  {
    top: '50%',
    left: '50%',
    transform: [{translateX: -50}, {translateY: -50}],
  },
  {
    bottom: 0,
    left: 0,
  },
  {
    bottom: 0,
    right: 0,
  },
];

const TaskStarList = () => {
  return (
    <Container>
      <StarContainer>
        {TASKS.map((task, index) => (
          <TaskStarListItem
            task={task}
            contentContainerStyle={[styles.absolute, StarPosition[index]]}
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
