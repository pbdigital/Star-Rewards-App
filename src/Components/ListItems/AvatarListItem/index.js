import React from 'react';
import {Image} from '../../Image';
import {Container} from './styles';

const AvatarListItem = ({avatar}) => {
  const {image, id} = avatar;
  return (
    <Container>
      <Image source={image} height={80} width={80} />
    </Container>
  );
};

export {AvatarListItem};
