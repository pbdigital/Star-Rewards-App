import React, {useRef, useEffect, useMemo, useState} from 'react';
import {Dimensions, ScrollView} from 'react-native';
import {CalendarWeek} from '../CalendarWeek';
import {TaskStarList} from '../TaskStarList';
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
} from 'Redux';
import {getTaskForTheDay} from 'Helpers';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import ConfettiCannon from 'react-native-confetti-cannon';
import {getTaskPercentageCompleted} from 'Helpers';
import {
  Content,
  Footer,
  SafeAreaFooter,
  SuccessMonsterAvatar,
  TaskListWrapper,
} from './styles';
import {playSound} from 'Helpers';

const Rewards = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const confetti = useRef(null);
  const showTaskSuccessConfetti = useSelector(
    childStateCongratulateTaskCompletedSelector,
  );
  const selectedDateToShowTask = useSelector(selectedDateToShowTaskSelector);
  const tasks = useSelector(childRewardsTasksSelector);
  const childName = useSelector(childNameSelector);

  const tasktForTheDay = useMemo(() => {
    const day = moment(selectedDateToShowTask, 'MM-DD-YYYY').format('ddd');
    return getTaskForTheDay({tasks, day});
  }, [selectedDateToShowTask, tasks]);

  const isToday = useMemo(() => {
    return selectedDateToShowTask === moment().format('MM-DD-YYYY');
  }, [selectedDateToShowTask]);

  const tasksToShow = useMemo(() => {
    const dayFilter = moment(selectedDateToShowTask, 'MM-DD-YYYY').format('YYYY-MM-DD');
    const findInArray = tasktForTheDay || [];
    const tasksNotDone = findInArray.filter(
      ({daysCompleted}) => !daysCompleted?.includes(dayFilter),
    );
    return tasksNotDone;
  }, [selectedDateToShowTask, tasktForTheDay]);

  const [percentageCompleted, setPercentageCompleted] = useState(0);

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
      date: moment(selectedDateToShowTask),
    });
    setPercentageCompleted(percentage);
  }, [tasks, setPercentageCompleted, selectedDateToShowTask]);

  const handleOnPressCliamButton = () => {
    navigation.navigate(NAV_ROUTES.rewards);
  };

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

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Content>
        <CalendarWeek />
        {percentageCompleted === 100 || tasktForTheDay.length === 0 ? (
          <SuccessMonsterAvatar>
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

                const today = moment().format('MM-DD-YYYY');
                const isToday = today === selectedDateToShowTask;

                if (tasktForTheDay.length === 0) {
                  return (
                    <Text
                      textAlign="center"
                      fontSize={16}
                      lineHeight={24}
                      color={COLORS.Text.grey}
                      fontWeight="400">
                      Great job {FormattedChildName}! {'\n'}
                      You had a day off!
                    </Text>
                  );
                }

                return (
                  <Text
                    textAlign="center"
                    fontSize={16}
                    lineHeight={24}
                    color={COLORS.Text.grey}
                    fontWeight="400">
                    Great job {FormattedChildName}! {'\n'}
                    You have collected all{'\n'}
                    your stars{isToday ? ' today.' : '.'}
                  </Text>
                );
              }}
              bubble="top"
            />
          </SuccessMonsterAvatar>
        ) : (
          <TaskListWrapper>
            <TaskStarList tasks={tasksToShow || []} />
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
                      ? ' how many stars will you collect today?'
                      : ' how many stars did you collect on this day?'}
                  </Text>
                );
              }}
              bubblePosition={BubblePosition.right}
            />
          </TaskListWrapper>
        )}
      </Content>
      {renderFooter()}
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
