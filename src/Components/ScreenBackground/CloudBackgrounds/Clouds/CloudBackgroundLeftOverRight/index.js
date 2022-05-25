import React from 'react';
import {CloudImage} from '../../../../CloudImage';
import {Root, Left, Right} from './styles';

const CloudBackgroundLeftOverRight = ({contentContainerStyle}) => {
  return (
    <Root style={contentContainerStyle || {}}>
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
