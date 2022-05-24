import React, {useEffect, useMemo} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {Images} from '../../Assets/Images';
import {Avatars} from '../../Constants/Avatars';
import {Text} from '../Text';
import {Image} from '../Image';
import {Container, SelectDropdown, AvatarContainer} from './styles';

const ProfileChildSelector = () => {
  const avatar = useSelector(({child}) => child.avatar);
  const childName = useSelector(({child}) => child.childName);

  useEffect(() => {
    console.log({avatar, childName})
  }, [avatar, childName]);

  const renderProfileAvatar = useMemo(() => {
    if (avatar?.id) {
      const avatarObj = Object.values(Avatars).find(
        ({id, image}) => id === avatar.id,
      );
      return (
        <AvatarContainer>
          <Image
            source={avatarObj.image}
            width={35}
            height={35}
            resizeMode="contain"
          />
        </AvatarContainer>
      );
    }

    return null;
  }, [avatar]);

  const renderChildDrowpDown = useMemo(() => {
    if (childName) {
      return (
        <SelectDropdown>
          <Text
            fontSize={20}
            lineHeight={30}
            fontWeight="600"
            textAlign="center"
            marginRight={12}>
            {childName}
          </Text>
          <Image source={Images.IcDropdown} width={14} height={8} />
        </SelectDropdown>
      );
    }

    return null;
  }, [childName]);

  return (
    <Container>
      {renderProfileAvatar}
      {renderChildDrowpDown}
    </Container>
  )
};

export {ProfileChildSelector};
