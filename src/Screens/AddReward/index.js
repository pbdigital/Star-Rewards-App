import React from 'react';
import {Button, ScreenBackground, Toolbar, EmojiPicker} from '../../Components';
import {Container, Content} from './styles';

const AddRewardScreen = () => {
  return (
    <ScreenBackground cloudType={0}>
      <Container>
        <Toolbar title="Add A Reward" />
        <Content>
          <EmojiPicker />
        </Content>
        <Button />
      </Container>
    </ScreenBackground>
  );
};

export {AddRewardScreen};
