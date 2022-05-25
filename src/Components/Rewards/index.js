import React from 'react';
import {CalendarWeek} from '../CalendarWeek';
import {TaskStarList} from '../TaskStarList';
import {Content} from './styles';

const Rewards = () => {
  return (
    <Content>
      <CalendarWeek />
      <TaskStarList />
    </Content>
  );
};

export {Rewards};
