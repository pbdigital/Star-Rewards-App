import React from 'react';
import {doHapticFeedback} from '../../../Helpers/TaskUtil';
import {Image} from '../../Image';
import {Container} from './styles';

const AvatarListItem = ({avatar, handleOnAvatarSelected, isSelected}) => {
  const {image, id} = avatar;

  const handleOnPressItem = () => {
    doHapticFeedback();
    handleOnAvatarSelected(id);
  };

  return (
    <Container isSelected={isSelected} onPressIn={handleOnPressItem}>
      <Image source={image} height={80} width={80} />
    </Container>
  );
};

export {AvatarListItem};
