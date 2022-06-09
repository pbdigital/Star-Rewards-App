import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {Avatars} from '../../Constants/Avatars';
import {childAvatarSelector} from '../../Redux/Child/ChildSelectors';
import {Image} from '../Image';

const ImageChildAvatar = props => {
  const childAvatarId = useSelector(childAvatarSelector);
  const avatarIdToUse = props?.avatarId || childAvatarId;
  const profileAvatar = useMemo(() => {
    if (avatarIdToUse) {
      const avatarObj = Object.values(Avatars).find(
        ({id}) => id === avatarIdToUse,
      );
      return <Image source={avatarObj.image} resizeMode="contain" {...props} />;
    }
    return null;
  }, [avatarIdToUse, props]);

  return profileAvatar;
};

export {ImageChildAvatar};
