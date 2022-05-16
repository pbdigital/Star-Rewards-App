import React from 'react';
import {CloudImage} from '../../../../CloudImage';
import {Root, Left, Right} from './styles';

const CloudBackgroundLeftOverRight = () => {
  return (
    <Root>
      <Left>
        <CloudImage />
      </Left>
      <Right>
        <CloudImage />
      </Right>
    </Root>
  );
};

export {CloudBackgroundLeftOverRight};
