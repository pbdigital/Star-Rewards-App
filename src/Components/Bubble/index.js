import React from 'react';
import {COLORS} from '../../Constants/Colors';
import {Text} from './../Text';
import {BubblePointer} from './BubblePointer';
import {WelcomeBubble} from './styles';

const Bubble = ({marginBottom}) => {
  return (
    <>
      <WelcomeBubble>
        <Text
          textAlign="center"
          fontSize={16}
          lineHeight={24}
          color={COLORS.Text.grey}
          fontWeight="400">
          What tasks do you want
          <Text
            textAlign="center"
            fontSize={16}
            lineHeight={24}
            color={COLORS.Text.grey}
            fontWeight="600">
            {'\n'}Indiana{' '}
          </Text>
          to get done?
        </Text>
      </WelcomeBubble>
      <BubblePointer marginTop={-65} />
    </>
  );
};

export {Bubble};
