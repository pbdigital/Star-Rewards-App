import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {Avatars} from '../../Constants/Avatars';
import {childAvatarSelector} from '../../Redux/Child/ChildSelectors';
import {Image} from '../Image';

const ImageChildAvatar = props => {
  const avatar = useSelector(childAvatarSelector);
  const profileAvatar = useMemo(() => {
    if (avatar?.id) {
      const avatarObj = Object.values(Avatars).find(
        ({id, image}) => id === avatar.id,
      );
      return <Image source={avatarObj.image} resizeMode="contain" {...props} />;
    }
    return null;
  }, [avatar]);

  return profileAvatar;
};

export {ImageChildAvatar};
