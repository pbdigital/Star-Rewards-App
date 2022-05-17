import React from 'react';
import {Images} from '../../../Assets/Images';
import {Image} from '../../Image';
import {Container} from './styles';

const MonsterListItem = () => {
  return (
    <Container>
      <Image source={Images.Monster1} height={80} width={80} />
    </Container>
  );
};

export {MonsterListItem};
