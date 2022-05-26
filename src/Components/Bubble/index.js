import React from 'react';
import {BubblePointer} from './BubblePointer';
import {WelcomeBubble} from './styles';

const Bubble = ({message}) => {
  return (
    <>
      <WelcomeBubble>{message && message()}</WelcomeBubble>
      <BubblePointer marginTop={-65} />
    </>
  );
};

export {Bubble};
