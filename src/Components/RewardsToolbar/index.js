import React from 'react';
import {Container} from './styles';
import {ProfileChildSelector} from '../ProfileChildSelector';
import {StartPointDisplay} from '../StarPointDisplay';
import {SettingsButton} from '../SettingsButton';

const RewardsToolbar = () => {
  return (
    <Container>
      <ProfileChildSelector contentContainerStyle={{flex:1}} />
      <StartPointDisplay marginRight={34} />
      <SettingsButton />
    </Container>
  );
};

export {RewardsToolbar};
