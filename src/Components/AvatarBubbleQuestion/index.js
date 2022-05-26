import React from 'react';
import {StyleSheet} from 'react-native';
import {BubblePointer} from '../Bubble/BubblePointer';
import {ImageChildAvatar} from '../ImageChildAvatar';
import {Container, Bubble} from './styles';

const AvatarBubbleQuestion = ({message}) => {
  return (
    <Container>
      <ImageChildAvatar width={100} height={100} />
      <Bubble>
        <BubblePointer style={styles.bubblePointer} />
        {message && message()}
      </Bubble>
    </Container>
  );
};

const styles = StyleSheet.create({
  bubblePointer: {
    transform: [{rotate: '-90deg'}],
    position: 'absolute',
    left: 0,
    marginLeft: -20,
  },
  message: {
    zIndex: 100,
  },
});

export {AvatarBubbleQuestion};
