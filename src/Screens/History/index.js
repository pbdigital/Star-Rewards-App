import React, {useState} from 'react';
import {View, useWindowDimensions} from 'react-native';
import {useDispatch} from 'react-redux';
import {LoadingIndicator, RewardsHistory, RewardsToolbar, ScreenBackground, StarRewardTabBar} from 'Components';
import {useNavigation} from '@react-navigation/native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {CompletedTask} from 'Components';

const CompletedTaskView = () => <CompletedTask />;

const SecondRoute = () => <RewardsHistory />;

const renderScene = SceneMap({
  completedTask: CompletedTaskView,
  rewards: SecondRoute,
});

const HistoryScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'completedTask', title: 'Completed Tasks'},
    {key: 'rewards', title: 'Rewards'},
  ]);

  return (
    <>
      <ScreenBackground cloudType={0}>
        <RewardsToolbar hideAvatar title="History" hideStarPointDisplay />
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
