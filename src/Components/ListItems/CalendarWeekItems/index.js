import React, {useEffect, useState} from 'react';
import {Text} from '../../Text';
import {Image} from '../../Image';
import {COLORS, DATE_FORMAT} from 'Constants';
import {Container} from './styles';
import moment from 'moment';
import ProgressCircle from 'react-native-progress-circle';
import {batch, useDispatch, useSelector} from 'react-redux';
import {childActions, selectedDateToShowTaskSelector} from 'AppReduxState';
import {Images} from 'Assets/Images';
import {getTaskPercentageCompleted} from 'Helpers';
import {childIdSelector} from 'AppReduxState';

const CalendarWeekItems = ({date: dateAsMoment, tasks}) => {
  const dispatch = useDispatch();
  const [percentageCompleted, setPercentageCompleted] = useState(0);
  const selectedDateToShowTask = useSelector(selectedDateToShowTaskSelector);
  const childId = useSelector(childIdSelector);
  const date = dateAsMoment.format('D');
  const day = dateAsMoment.format('dd');
  const isCurrentSelectedDay =
    dateAsMoment.format(DATE_FORMAT) ===
    moment(selectedDateToShowTask, DATE_FORMAT).format(DATE_FORMAT);

  console.log(
    'hohohohoh',
    {dateAsMoment, selectedDateToShowTask},
    moment(selectedDateToShowTask, DATE_FORMAT).format(DATE_FORMAT),
    dateAsMoment.format(DATE_FORMAT),
  );

  useEffect(() => {
    const percentage = getTaskPercentageCompleted({
      tasks,
      date: dateAsMoment,
    });
    setPercentageCompleted(percentage);
  }, [tasks, setPercentageCompleted, dateAsMoment]);

  const handleOnPressDayItem = () => {
    batch(() => {
      dispatch(
        childActions.setSelectedDateToShowTask(
          dateAsMoment.format(DATE_FORMAT),
        ),
      );
      dispatch(
        childActions.getChildTasks({
          childId,
          time: moment(),
        }),
      );
    });
  };

  return (
    <Container
      isCurrentDay={isCurrentSelectedDay}
      disabled={!dateAsMoment.isSameOrBefore(moment())}
      onPress={handleOnPressDayItem}>
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
