/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useRef, useEffect, useMemo, useState} from 'react';
import {Dimensions, RefreshControl, ScrollView} from 'react-native';
import {CalendarWeek} from '../CalendarWeek';
import {TaskStarList} from '../TaskStarList';
import {EmptyListState} from '../EmptyListState';
import {ImageChildAvatar} from '../ImageChildAvatar';
import {CloudBackgroundLeftOverRight} from '../ScreenBackground/CloudBackgrounds/Clouds/CloudBackgroundLeftOverRight';
import {COLORS, NAV_ROUTES} from 'Constants';
import {Button} from '../Button';
import {AvatarSpeaking, BubblePosition} from '../AvatarSpeaking';
import {Text} from '../Text';
import {useSelector, useDispatch} from 'react-redux';
import {
  childNameSelector,
  childRewardsTasksSelector,
  childStateCongratulateTaskCompletedSelector,
  childActions,
  selectedDateToShowTaskSelector,
  childStateIsLoadingSelector,
} from 'AppReduxState';
import {getTaskForTheDay} from 'Helpers';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import ConfettiCannon from 'react-native-confetti-cannon';
import {getTaskPercentageCompleted} from 'Helpers';
import {playSound} from 'Helpers';
import {STAR_LIST_TYPE} from '../../Constants';
import {
  CloudContainer,
  Content,
  Footer,
  SafeAreaFooter,
  SuccessMonsterAvatar,
  TaskListWrapper,
} from './styles';

const Rewards = ({onRefresh: onRewardsRefresh}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const confetti = useRef(null);
  const showTaskSuccessConfetti = useSelector(
    childStateCongratulateTaskCompletedSelector,
  );
  const selectedDateToShowTask = useSelector(selectedDateToShowTaskSelector);
  const tasks = useSelector(childRewardsTasksSelector);
  const childName = useSelector(childNameSelector);
  const isLoading = useSelector(childStateIsLoadingSelector);

  const tasktForTheDay = useMemo(() => {
    const day = moment(selectedDateToShowTask, 'MM-DD-YYYY').format('ddd');
    return getTaskForTheDay({tasks, day});
  }, [selectedDateToShowTask, tasks]);

  const isToday = useMemo(() => {
    return selectedDateToShowTask === moment().format('MM-DD-YYYY');
  }, [selectedDateToShowTask]);

  const [percentageCompleted, setPercentageCompleted] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (showTaskSuccessConfetti) {
      confetti?.current?.start();

      setTimeout(() => {
        dispatch(childActions.setCongratulateTaskCompleted(false));
      }, 1000);

      playSound('day_complete_sound', 'mp3');
    }
  }, [showTaskSuccessConfetti, dispatch]);

  useEffect(() => {
    const percentage = getTaskPercentageCompleted({
      tasks,
      date: moment(selectedDateToShowTask, 'MM-DD-YYYY'),
    });
    setPercentageCompleted(percentage);
  }, [tasks, setPercentageCompleted, selectedDateToShowTask]);

  const handleOnPressCliamButton = () => {
    navigation.navigate(NAV_ROUTES.rewards);
  };

  // eslint-disable-next-line no-unused-vars
  const renderFooter = () => (
    <SafeAreaFooter edges={['bottom']}>
      <Footer>
        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Green}
          shadowColor={COLORS.GreenShadow}
          onPress={handleOnPressCliamButton}
          title="Claim Reward"
          buttonTitleFontSize={16}
        />
      </Footer>
    </SafeAreaFooter>
  );

  useEffect(() => {
    console.log('TASK FOR TODAY', {tasktForTheDay});
  }, [tasktForTheDay]);

  const onRefresh = () => {
    setRefreshing(true);
    if (onRewardsRefresh) {
      onRewardsRefresh();
    }
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }>
      <Content>
        <CalendarWeek />
        {(percentageCompleted === 100 || tasktForTheDay.length === 0) &&
        !isLoading ? (
          <SuccessMonsterAvatar>
            <EmptyListState
              message={
                tasktForTheDay.length === 0
                  ? "Your sky is clear of tasks,\nbut that doesn't mean the fun\nhas to wait. It's a perfect time to\nexplore, dream, and let your\nimagination soar!"
                  : `Congratulations, ${childName}!\nYou've conquered the skies\ntoday, completing all your tasks\nwith flying colors.`
              }
              starImage={
                <ImageChildAvatar
                  width={140}
                  height={140}
                  style={{marginTop: 26}}
                />
              }
              hideCloudLeft
              hideCloudRight
              messageStyle={tasktForTheDay.length === 0 ? {top: 50} : {}}
            />
            <CloudContainer>
              <CloudBackgroundLeftOverRight />
            </CloudContainer>
          </SuccessMonsterAvatar>
        ) : (
          <TaskListWrapper>
            {!isLoading && (
              <>
                <TaskStarList
                  type={STAR_LIST_TYPE.rewards}
                  tasks={tasktForTheDay || []}
                />
                <AvatarSpeaking
                  message={() => {
                    const FormattedChildName = (
                      <Text
                        textAlign="center"
                        fontSize={16}
                        lineHeight={24}
                        color={COLORS.Text.grey}
                        fontWeight="bold">
                        {childName}
                      </Text>
                    );
                    return (
                      <Text
                        textAlign="center"
                        fontSize={16}
                        lineHeight={24}
                        color={COLORS.Text.grey}
                        fontWeight="400">
                        {FormattedChildName},
                        {isToday
                          ? ' how many stars can you collect today?'
                          : ' how many stars did you collect?'}
                      </Text>
                    );
                  }}
                  bubblePosition={BubblePosition.right}
                />
              </>
            )}
          </TaskListWrapper>
        )}
      </Content>
      <ConfettiCannon
        count={50}
        origin={{x: Dimensions.get('screen').width / 2, y: -20}}
        fadeOut={true}
        autoStart={false}
        ref={confetti}
      />
    </ScrollView>
  );
};

export {Rewards};
