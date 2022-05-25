import React from 'react';
import {CalendarWeek} from '../CalendarWeek';
import {TaskStarList} from '../TaskStarList';
import {AvatarBubbleQuestion} from '../AvatarBubbleQuestion';
import {Content} from './styles';

const Rewards = () => {
  return (
    <Content>
      <CalendarWeek />
      <TaskStarList />
      <AvatarBubbleQuestion />
    </Content>
  );
};

export {Rewards};
