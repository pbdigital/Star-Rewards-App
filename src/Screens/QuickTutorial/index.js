import React from 'react';
import PagerView from 'react-native-pager-view';
import {
  QuickTutorial,
  TapAndHold,
  EarningRewards,
  ClaimingRewards,
  AddSwitchChildProfile,
} from 'src/Components/Tutorials';
import {PageContainer} from './styles';

const QuickTutorialScreen = () => {
  return (
    <PagerView style={{flex: 1}}>
      <PageContainer key="1">
        <QuickTutorial />
      </PageContainer>
      <PageContainer key="2">
        <TapAndHold />
      </PageContainer>
      <PageContainer key="3">
        <EarningRewards />
      </PageContainer>
      <PageContainer key="4">
        <ClaimingRewards />
      </PageContainer>
      <PageContainer key="5">
        <AddSwitchChildProfile />
      </PageContainer>
    </PagerView>
  );
};

export {QuickTutorialScreen};
