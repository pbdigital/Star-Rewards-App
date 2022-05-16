import React from 'react';
import {CloudImage} from '../../../../CloudImage';
import {Root, Left, Right} from './styles';

const CloudBackgroundRightOverLeft = () => {
  return (
    <Root>
      <Right>
        <CloudImage />
      </Right>
      <Left>
        <CloudImage />
      </Left>
    </Root>
  );
};

export {CloudBackgroundRightOverLeft};
