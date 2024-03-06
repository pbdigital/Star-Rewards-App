/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {
  LoadingIndicator,
  RewardsHistory,
  RewardsToolbar,
  ScreenBackground,
  StarRewardTabBar,
  StarAdjustments,
  CompletedTask,
  Statistics,
} from 'Components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {HISTORY_TAB, NAV_ROUTES} from '../../Constants';

const StatsView = () => <Statistics />;
const CompletedTaskView = () => <CompletedTask />;
const SecondRoute = () => <RewardsHistory />;
const Adjustments = () => <StarAdjustments />;
const renderScene = SceneMap({
  statsView: StatsView,
  completedTask: CompletedTaskView,
  rewards: SecondRoute,
  // adjustments: Adjustments,
});

const HistoryScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {isAdjustments, tab} = route.params || {};
  const [isLoading, setIsLoading] = useState(false);
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'statsView', title: 'Stats'},
    {key: 'completedTask', title: 'Stars Collected'},
    {key: 'rewards', title: 'Rewards'},
    // {key: 'adjustments', title: 'Adjustments'},
  ]);
  const onPressAdjustStars = () => {
    navigation.navigate(NAV_ROUTES.starsAdjustmentForm);
  };

  useEffect(() => {
    let pageIndex = 0;
    switch (tab) {
      case HISTORY_TAB.completedTasks:
        pageIndex = 1;
        break;
      case HISTORY_TAB.rewards:
        pageIndex = 2;
        break;
      default:
        break;
    }
    if (isAdjustments) pageIndex = 2;
    setIndex(pageIndex);
  }, [tab, isAdjustments]);

  const handleOnPressBackButton = () => {
    navigation.navigate(NAV_ROUTES.bottomTabNavigator);
  };

  return (
    <>
      <ScreenBackground cloudType={0}>
        <RewardsToolbar
          centerTitle
          hideAvatar
          title="History"
          onBackButtonPress={handleOnPressBackButton}
          titleStyle={{paddingLeft: 90}}
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
      {/* <FooterContainer style={styles.footerShadow}>
        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Green}
          shadowColor={COLORS.GreenShadow}
          onPress={onPressAdjustStars}
          title="Adjust Stars"
          buttonTitleFontSize={16}
        />
      </FooterContainer> */}
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
