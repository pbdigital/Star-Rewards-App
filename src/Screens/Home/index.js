import React from 'react';
import {Text} from 'react-native';
import {RewardsToolbar, ScreenBackground} from '../../Components';

const HomeScreen = () => {
  return (
    <ScreenBackground cloudType={0}>
      <RewardsToolbar />
    </ScreenBackground>
  );
};

export {HomeScreen};
