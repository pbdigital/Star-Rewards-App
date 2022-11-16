import React, {useState, useEffect, useCallback} from 'react';
import moment from 'moment';
import {COLORS} from 'Constants';
import {Text} from '../Text';
import {CalendarWeekItems} from '../ListItems/CalendarWeekItems';
import {getCurrentWeekDays} from 'Helpers';
import {useSelector} from 'react-redux';
import {selectedChildSelector, childIdSelector} from 'Redux';
import {ChildService} from 'Services';
import {Content, DayContainer} from './styles';

const CalendarWeek = () => {
  const weekDates = getCurrentWeekDays();
  const currentMonth = moment().format('MMM');
  const childId = useSelector(childIdSelector);
  const selectedChild = useSelector(selectedChildSelector);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    retreiveChildTasks();
  }, []);

  useEffect(() => {
    retreiveChildTasks();
  }, [selectedChild]);

  const retreiveChildTasks = useCallback(async () => {
    if (childId) {
      const payload = {
        childId,
        time: moment().format(),
      };
      const {data} = await ChildService.getChildTasks(payload);
      const {success, tasks: childTasks} = data || {};
      if (success && childTasks) {
        setTasks(childTasks);
      }
    }
  }, [childId]);

  const renderCalendarItems = useCallback(() => {
    return weekDates.map((date, index) => (
      <CalendarWeekItems
        date={date}
        key={`${index}-calendar-date-item`}
        tasks={tasks}
      />
    ));
  }, [tasks, weekDates]);

  return (
    <Content>
      <Text fontSize={18} fontWeight="600" lineHeight={27} color={COLORS.White}>
        {currentMonth}
      </Text>
      <DayContainer>{renderCalendarItems()}</DayContainer>
    </Content>
  );
};

export {CalendarWeek};
