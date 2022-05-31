import React from 'react';
import {StyleSheet} from 'react-native';
import {
  BonusRewards,
  Rewards,
  RewardsToolbar,
  ScreenBackground,
  SettingsButton,
} from '../../Components';
import PagerView from 'react-native-pager-view';
import {PageContainer} from './styles';

const HomeScreen = () => {
  return (
    <ScreenBackground cloudType={0}>
      <RewardsToolbar rightControlButton={<SettingsButton />} />
      <PagerView style={styles.pager} initialPage={0}>
        <PageContainer key="1">
          <Rewards />
        </PageContainer>
        <PageContainer key="2">
          <BonusRewards />
        </PageContainer>
      </PagerView>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  pager: {
    flex: 1,
  },
});

export {HomeScreen};
