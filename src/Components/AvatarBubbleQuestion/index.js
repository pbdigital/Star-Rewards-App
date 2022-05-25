import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../Constants/Colors';
import {BubblePointer} from '../Bubble/BubblePointer';
import {ImageChildAvatar} from '../ImageChildAvatar';
import {Text} from '../Text';
import {Container, Bubble} from './styles';

const AvatarBubbleQuestion = () => {
  return (
    <Container>
      <ImageChildAvatar width={100} height={100} />
      <Bubble>
        <BubblePointer style={styles.bubblePointer} />
        <Text
          textAlign="center"
          fontSize={16}
          lineHeight={24}
          color={COLORS.Text.grey}
          fontWeight="400"
          style={styles.message}>
          What tasks have you{'\n'}done today?
        </Text>
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
