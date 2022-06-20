import React, {useEffect, useMemo, useState} from 'react';
import {Text} from '../../Text';
import {COLORS} from '../../../Constants/Colors';
import {Container} from './styles';
import moment from 'moment';
import ProgressCircle from 'react-native-progress-circle';
import {useSelector} from 'react-redux';
import {childRewardsTasksSelector} from '../../../Redux/Child/ChildSelectors';
import {getTaskForTheDay} from '../../../Helpers/CalendarUtils';

const CalendarWeekItems = ({date: dateAsMoment}) => {
  const [percentageCompleted, setPercentageCompleted] = useState(0);
  const tasks = useSelector(childRewardsTasksSelector);
  const dateToday = moment().format('MMDDYY');
  const strDate = dateAsMoment.format('MMDDYY');
  const date = dateAsMoment.format('D');
  const day = dateAsMoment.format('dd');
  const isCurrentDay = dateToday === strDate;
  const taskForThisDay = useMemo(
    () => getTaskForTheDay({tasks, day: dateAsMoment.format('ddd')}),
    [tasks, dateAsMoment],
  );

  useEffect(() => {
    const completedTasks = taskForThisDay.reduce(
      (prev, {daysCompleted}, cur) => {
        const today = dateAsMoment.format('YYYY-MM-DD');
        const findInArray = daysCompleted || [];
        if (findInArray.includes(today)) {
          return prev + 1;
        }
        return prev;
      },
      0,
    );
    setPercentageCompleted((completedTasks / tasks.length) * 100);
  }, [tasks, taskForThisDay, setPercentageCompleted, dateAsMoment]);

  return (
    <Container isCurrentDay={isCurrentDay}>
      <Text
        fontSize={13}
        lineHeight={20}
        fontWeight="500"
        textAlign="center"
        color={COLORS.White}>
        {day}
      </Text>
      <ProgressCircle
        percent={percentageCompleted}
        radius={12}
        borderWidth={3}
        color={COLORS.Yellow}
        shadowColor={COLORS.LightBlue}
        bgColor={COLORS.DarkBlue}
      />
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
