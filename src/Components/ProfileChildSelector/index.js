import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {Images} from '../../Assets/Images';
import {Avatars} from '../../Constants/Avatars';
import {Text} from '../Text';
import {Image} from '../Image';
import {Container, SelectDropdown, AvatarContainer} from './styles';
import { ImageChildAvatar } from '../ImageChildAvatar';

const ProfileChildSelector = ({contentContainerStyle}) => {
  const childName = useSelector(({child}) => child.childName);

  const childDrowpDown = useMemo(() => {
    if (childName) {
      return (
        <SelectDropdown>
          <Text
            fontSize={20}
            lineHeight={30}
            fontWeight="600"
            textAlign="center"
            numberOfLines={1}
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
    <Container style={contentContainerStyle || {}}>
      <AvatarContainer>
        <ImageChildAvatar width={35} height={35} resizeMode="contain" />
      </AvatarContainer>
      {childDrowpDown}
    </Container>
  );
};

export {ProfileChildSelector};
