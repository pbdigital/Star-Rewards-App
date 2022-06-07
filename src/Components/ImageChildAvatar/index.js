import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {Avatars} from '../../Constants/Avatars';
import {childAvatarSelector} from '../../Redux/Child/ChildSelectors';
import {Image} from '../Image';

const ImageChildAvatar = props => {
  const avatarId = useSelector(childAvatarSelector);
  const profileAvatar = useMemo(() => {
    if (avatarId) {
      const avatarObj = Object.values(Avatars).find(({id}) => id === avatarId);
      return <Image source={avatarObj.image} resizeMode="contain" {...props} />;
    }
    return null;
  }, [avatarId, props]);

  return profileAvatar;
};

export {ImageChildAvatar};
