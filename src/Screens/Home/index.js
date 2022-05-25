import React from 'react';
import {
  BonusRewards,
  Rewards,
  RewardsToolbar,
  ScreenBackground,
} from '../../Components';
import PagerView from 'react-native-pager-view';
import {PageContainer} from './styles';

const HomeScreen = () => {
  return (
    <ScreenBackground cloudType={0}>
      <RewardsToolbar />
      <PagerView style={{flex:1}} initialPage={0}>
        <PageContainer key="1">
          <Rewards />
        </PageContainer>
        <PageContainer key="2" style={{backgroundColor: 'blue'}}>
          <BonusRewards />
        </PageContainer>
      </PagerView>
    </ScreenBackground>
  );
};

export {HomeScreen};
