import React, {useEffect, useMemo, useState} from 'react';
import {Text} from '../../Text';
import {Image} from '../../Image';
import {COLORS} from 'Constants';
import {Container} from './styles';
import moment from 'moment';
import ProgressCircle from 'react-native-progress-circle';
import {useSelector} from 'react-redux';
import {childRewardsTasksSelector} from 'Redux';
import {getTaskForTheDay} from 'Helpers';
import {Images} from 'Assets/Images';
import {getTaskPercentageCompleted} from 'Helpers';

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
    const percentage = getTaskPercentageCompleted({tasks, date: dateAsMoment});
    setPercentageCompleted(percentage);
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
