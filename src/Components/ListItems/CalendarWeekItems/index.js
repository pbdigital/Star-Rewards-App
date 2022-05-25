import React from 'react';
import {Text} from '../../Text';
import {COLORS} from '../../../Constants/Colors';
import {Container, Circle} from './styles';
import moment from 'moment';

const CalendarWeekItems = ({date: dateAsMoment}) => {
  const dateToday = moment().format('MMDDYY');
  const strDate = dateAsMoment.format('MMDDYY');
  const date = dateAsMoment.format('DD');
  const day = dateAsMoment.format('dd');
  const isCurrentDay = dateToday === strDate;
  
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
      <Circle />
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
