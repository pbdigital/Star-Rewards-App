import React from 'react';
import {Bubble} from 'Components';
import {ImageChildAvatar} from '../ImageChildAvatar';
import {AvatarBubbleQuestion} from '../AvatarBubbleQuestion';
import {Content, AvatarContainer} from './styles';

const BubblePosition = {
  top: 1,
  right: 0,
};

const AvatarSpeaking = ({
  message,
  contentContainerStyle,
  bubblePosition = BubblePosition.top,
}) => {
  const bubbleOnTop = (
    <Content style={contentContainerStyle || {}}>
      <Bubble message={message} />
      <AvatarContainer>
        <ImageChildAvatar width={140} height={140} />
      </AvatarContainer>
    </Content>
  );

  const bubbleOnRight = <AvatarBubbleQuestion message={message} />;

  let avatarSpeakingView;

  switch (bubblePosition) {
    case BubblePosition.right:
      avatarSpeakingView = bubbleOnRight;
      break;
    case BubblePosition.top:
    default:
      avatarSpeakingView = bubbleOnTop;
  }

  return avatarSpeakingView;
};

export {AvatarSpeaking, BubblePosition};
