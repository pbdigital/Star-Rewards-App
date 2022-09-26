import React, {useEffect, useState} from 'react';
import {Text} from '../../Text';
import {Image} from '../../Image';
import {COLORS} from 'Constants';
import {Container} from './styles';
import moment from 'moment';
import ProgressCircle from 'react-native-progress-circle';
import {useDispatch, useSelector} from 'react-redux';
import {
  childRewardsTasksSelector,
  childActions,
  selectedDateToShowTaskSelector,
} from 'Redux';
import {Images} from 'Assets/Images';
import {getTaskPercentageCompleted} from 'Helpers';

const CalendarWeekItems = ({date: dateAsMoment}) => {
  const dispatch = useDispatch();
  const [percentageCompleted, setPercentageCompleted] = useState(0);
  const tasks = useSelector(childRewardsTasksSelector);
  const selectedDateToShowTask = useSelector(selectedDateToShowTaskSelector);
  const date = dateAsMoment.format('D');
  const day = dateAsMoment.format('dd');
  const isCurrentSelectedDay =
    dateAsMoment.format('ddd') === moment(selectedDateToShowTask, 'MM-DD-YYYY').format('ddd');

  useEffect(() => {
    const percentage = getTaskPercentageCompleted({
      tasks,
      date: dateAsMoment,
    });
    setPercentageCompleted(percentage);
  }, [tasks, setPercentageCompleted, dateAsMoment]);

  return (
    <Container
      isCurrentDay={isCurrentSelectedDay}
      onPress={() => {
        dispatch(
          childActions.setSelectedDateToShowTask(
            dateAsMoment.format('MM-DD-YYYY'),
          ),
        );
      }}>
      <Text
        fontSize={13}
        lineHeight={20}
        fontWeight="500"
        textAlign="center"
        color={COLORS.White}>
        {day}
      </Text>
      {percentageCompleted === 100 ? (
        <Image source={Images.IcComplete} width={24} height={24} />
      ) : (
        <ProgressCircle
          percent={percentageCompleted}
          radius={12}
          borderWidth={3}
          color={COLORS.Yellow}
          shadowColor={COLORS.LightBlue}
          bgColor={COLORS.DarkBlue}
        />
      )}
      <Text
        fontSize={13}
        lineHeight={20}
        fontWeight="500"
        textAlign="center"
        color={COLORS.White}>
        {date}
      </Text>
    </Container>
  );
};

export {CalendarWeekItems};
