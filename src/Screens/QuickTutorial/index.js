import React from 'react';
import PagerView from 'react-native-pager-view';
import { PageContainer } from './styles';
import { Text } from 'Components';
import { QuickTutorial } from 'src/Components/Tutorials';
import { TapAndHold } from 'src/Components/Tutorials';

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
        <Text>page 3</Text>
      </PageContainer>
      <PageContainer key="4">
        <Text>page 4</Text>
      </PageContainer>
      <PageContainer key="5">
        <Text>page 5</Text>
      </PageContainer>
    </PagerView>
  );
};

export {QuickTutorialScreen};
