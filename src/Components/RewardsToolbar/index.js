import React from 'react';
import {Container} from './styles';
import {ProfileChildSelector} from '../ProfileChildSelector';

const RewardsToolbar = () => {
  return (
    <Container>
      <ProfileChildSelector />
      {/* 
      <Stars />
      <SettingsMenu /> */}
    </Container>
  );
};

export {RewardsToolbar};
