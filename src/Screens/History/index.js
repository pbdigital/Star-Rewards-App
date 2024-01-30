import React, {useState} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {
  LoadingIndicator,
  RewardsHistory,
  RewardsToolbar,
  ScreenBackground,
  StarRewardTabBar,
  StarAdjustments,
} from 'Components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {CompletedTask} from 'Components';
import {Button} from '../../Components';
import {COLORS, NAV_ROUTES} from '../../Constants';
import {FooterContainer} from './styles';

const CompletedTaskView = () => <CompletedTask />;
const SecondRoute = () => <RewardsHistory />;
const Adjustments = () => <StarAdjustments />;
const renderScene = SceneMap({
  completedTask: CompletedTaskView,
  rewards: SecondRoute,
  adjustments: Adjustments,
});

const HistoryScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {isRewards} = route.params || {};
  const [isLoading, setIsLoading] = useState(false);
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(() => (isRewards ? 1 : 0));
  const [routes] = React.useState([
    {key: 'completedTask', title: 'Completed Tasks'},
    {key: 'rewards', title: 'Rewards'},
    {key: 'adjustments', title: 'Adjustments'},
  ]);
  const onPressAdjustStars = () => {
    navigation.navigate(NAV_ROUTES.starsAdjustmentForm);
  };

  return (
    <>
      <ScreenBackground cloudType={0}>
        <RewardsToolbar
          centerTitle
          hideAvatar
          title="History"
          hideStarPointDisplay
        />
        <TabView
          renderTabBar={props => <StarRewardTabBar {...props} />}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          swipeEnabled={false}
        />
      </ScreenBackground>
      <FooterContainer style={styles.footerShadow}>
        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Green}
          shadowColor={COLORS.GreenShadow}
          onPress={onPressAdjustStars}
          title="Adjust Stars"
          buttonTitleFontSize={16}
        />
      </FooterContainer>
      {isLoading && <LoadingIndicator />}
    </>
  );
};

const styles = StyleSheet.create({
  footerShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export {HistoryScreen};
