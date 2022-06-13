import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {
  BonusRewards,
  LoadingIndicator,
  Rewards,
  RewardsToolbar,
  ScreenBackground,
  SelectProfiles,
  SettingsButton,
} from '../../Components';
import PagerView from 'react-native-pager-view';
import {PageContainer} from './styles';
import {useDispatch} from 'react-redux';
import {childActions} from '../../Redux/Child/ChildSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();
  const [showProfileSelector, setShowProfileSelector] = useState(false);

  useEffect(() => {
    const fetchAllChildren = async () => {
      setIsLoading(true);
      const {payload} = await dispatch(childActions.getAllChildren());
      if (!payload?.success) {
        Alert.alert(
          'Unable to retrive your child list. Please try again later.',
        );
      }
      setIsLoading(false);
    };

    fetchAllChildren();
  }, []);

  const closeProfileSelector = () => setShowProfileSelector(false);
  const openProfileSelector = () => setShowProfileSelector(true);

  return (
    <>
      <ScreenBackground cloudType={0}>
        <RewardsToolbar
          rightControlButton={<SettingsButton />}
          onPressSelectChild={openProfileSelector}
        />
        <PagerView style={styles.pager} initialPage={0}>
          <PageContainer key="1">
            <Rewards />
          </PageContainer>
          <PageContainer key="2">
            <BonusRewards />
          </PageContainer>
        </PagerView>
      </ScreenBackground>
      <SelectProfiles
        isVisible={showProfileSelector}
        onCloseAnimation={closeProfileSelector}
      />
      {isLoading && <LoadingIndicator />}
    </>
  );
};

const styles = StyleSheet.create({
  pager: {
    flex: 1,
  },
});

export {HomeScreen};
