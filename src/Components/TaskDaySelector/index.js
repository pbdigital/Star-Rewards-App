import React from 'react';
import moment from 'moment';
import {FormLabel} from '../FormLabel';
import {Text} from '../Text';
import {Root, Row, WeekDateItem} from './styles';
import {COLORS} from '../../Constants/Colors';

const weekDates = moment.weekdays().map(day => day.split('').splice(0, 1));

const TaskDaySelector = ({selectedDays, onDaySelected}) => {
  return (
    <Root>
      <FormLabel value="Select days" />
      <Row justifyContent={'space-between'}>
        {weekDates.map((weekDay, index) => {
          const isSelected = selectedDays.includes(`${index}`);
          const textColor = isSelected ? COLORS.LightBlue : COLORS.Text.grey;

          return (
            <WeekDateItem
              key={`${weekDay}-${index}`}
              isSelected={isSelected}
              onPress={() => onDaySelected(index)}>
              <Text
                fontWeight="400"
                fontSize={18}
                lineHeight={24}
                textAlign="center"
                color={textColor}>
                {weekDay}
              </Text>
            </WeekDateItem>
          );
        })}
      </Row>
    </Root>
  );
};

export {TaskDaySelector};
