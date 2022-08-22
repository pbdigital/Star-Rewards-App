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
  const tasks = useSelector(childRewardsTasksSelector);
  const childName = useSelector(childNameSelector);
  const tasksToShow = useMemo(() => {
    const tasktForTheDay = getTaskForTheDay({tasks});
    const today = moment().format('YYYY-MM-DD');
    const findInArray = tasktForTheDay || [];
    const tasksNotDone = findInArray.filter(
      ({daysCompleted}) => !daysCompleted?.includes(today),
    );
    return tasksNotDone;
  }, [tasks]);
  const [percentageCompleted, setPercentageCompleted] = useState(0);

  useEffect(() => {
    console.log('wasss', {showTaskSuccessConfetti});
    if (showTaskSuccessConfetti) {
      confetti?.current?.start();

      setTimeout(() => {
        dispatch(childActions.setCongratulateTaskCompleted(false));
      }, 1000);

      if (tasksToShow?.length === 0) {
        playSound('day_complete_sound', 'mp3');
      }
    }
  }, [showTaskSuccessConfetti, dispatch, tasksToShow]);

  useEffect(() => {
    const percentage = getTaskPercentageCompleted({tasks, date: moment()});
    setPercentageCompleted(percentage);
  }, [tasks, setPercentageCompleted]);

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

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Content>
        <CalendarWeek />
        {percentageCompleted === 100 ? (
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

                return (
                  <Text
                    textAlign="center"
                    fontSize={16}
                    lineHeight={24}
                    color={COLORS.Text.grey}
                    fontWeight="400">
                    Great job {FormattedChildName}! {'\n'}
                    You have collected all{'\n'}
                    your stars today.
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
                    {FormattedChildName}, how many stars will you collect today?
                  </Text>
                );
              }}
              bubblePosition={BubblePosition.right}
            />
          </TaskListWrapper>
        )}
      </Content>
      {renderFooter()}
      {percentageCompleted === 100 ? (
        <ConfettiCannon
          count={50}
          origin={{x: Dimensions.get('screen').width / 2, y: -20}}
          fadeOut={true}
          autoStart={false}
          ref={confetti}
        />
      ) : null}
    </ScrollView>
  );
};

export {Rewards};
