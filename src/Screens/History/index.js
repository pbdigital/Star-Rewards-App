import React, {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {
  LoadingIndicator,
  RewardsHistory,
  RewardsToolbar,
  ScreenBackground,
  StarRewardTabBar,
} from 'Components';
import {useRoute} from '@react-navigation/native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {CompletedTask} from 'Components';

const CompletedTaskView = () => <CompletedTask />;
const SecondRoute = () => <RewardsHistory />;
const renderScene = SceneMap({
  completedTask: CompletedTaskView,
  rewards: SecondRoute,
});

const HistoryScreen = () => {
  const route = useRoute();
  const {isRewards} = route.params || {};
  const [isLoading, setIsLoading] = useState(false);
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(() => (isRewards ? 1 : 0));
  const [routes] = React.useState([
    {key: 'completedTask', title: 'Completed Tasks'},
    {key: 'rewards', title: 'Rewards'},
  ]);

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
      {isLoading && <LoadingIndicator />}
    </>
  );
};

export {HistoryScreen};
