import React from 'react';
import moment from 'moment';
import {COLORS} from '../../Constants/Colors';
import {Text} from '../Text';
import {CalendarWeekItems} from '../ListItems/CalendarWeekItems';
import {getCurrentWeekDays} from '../../Helpers/CalendarUtils';
import {Content, DayContainer} from './styles';

const CalendarWeek = () => {
  const weekDates = getCurrentWeekDays();
  const currentMonth = moment().format('MMM');
  return (
    <Content>
      <Text fontSize={18} fontWeight="600" lineHeight={27} color={COLORS.White}>
        {currentMonth}
      </Text>
      <DayContainer>
        {weekDates.map((date, index) => (
          <CalendarWeekItems date={date} key={`${index}-calendar-date-item`} />
        ))}
      </DayContainer>
    </Content>
  );
};

export {CalendarWeek};
