import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setAvatar} from '../../../Redux/Child/ChildSlice';
import {Image} from '../../Image';
import {Container} from './styles';

const AvatarListItem = ({avatar}) => {
  const {image, id} = avatar;
  const dispatch = useDispatch();
  const selectedAvatar = useSelector(({child}) => child.avatar);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    setIsSelected(id === selectedAvatar?.id);
  }, [avatar, selectedAvatar]);

  const handleOnAvatarSelected = () => {
    dispatch(setAvatar(avatar));
  };

  return (
    <Container isSelected={isSelected} onPressIn={handleOnAvatarSelected}>
      <Image source={image} height={80} width={80} />
    </Container>
  );
};

export {AvatarListItem};
