import moment from 'moment';
import React from 'react';
import {COLORS} from '../../Constants/Colors';
import {Text} from '../Text';
import {CalendarWeekItems} from '../ListItems/CalendarWeekItems';
import {Content, DayContainer} from './styles';
import {getCurrentWeekDays} from '../../Helpers/CalendarUtils';

const CalendarWeek = () => {
  const weekDates = getCurrentWeekDays();
  // const weekDates = moment.weekdays().map(day => day.split('').splice(0, 2));
  const currentMonth = moment().format('MMM');
  return (
    <Content>
      <Text fontSize={18} fontWeight="600" lineHeight={27} color={COLORS.White}>
        {currentMonth}
      </Text>
      <DayContainer>
        {weekDates.map(date => (
          <CalendarWeekItems date={date} />
        ))}
      </DayContainer>
    </Content>
  );
};

export {CalendarWeek};
