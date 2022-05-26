import React from 'react';
import {View} from 'react-native';
import {Bubble} from '../../Components';
import {ImageChildAvatar} from '../ImageChildAvatar';
import {Content, AvatarContainer} from './styles';

const AvatarSpeaking = ({message, contentContainerStyle}) => {
  return (
    <Content style={contentContainerStyle || {}}>
      <Bubble message={message} />
      <AvatarContainer>
        <ImageChildAvatar width={140} height={140} />
      </AvatarContainer>
    </Content>
  );
};

export {AvatarSpeaking};
