import React, {useMemo} from 'react';
import moment from 'moment';
import {FormLabel} from '../FormLabel';
import {Text} from '../Text';
import {Root, Row, WeekDateItem} from './styles';
import {COLORS} from 'Constants';
import {doHapticFeedback} from 'Helpers';
import {useSelector} from 'react-redux';
import {childNameSelector} from 'Redux';

const weekDates = moment.weekdays().map(day => day.split('').splice(0, 1));

const TaskDaySelector = ({selectedDays, onDaySelected}) => {
  const childName = useSelector(childNameSelector);
  const renderDays = useMemo(
    () =>
      weekDates.map((weekDay, index) => {
        const isSelected = selectedDays.includes(index);
        const textColor = isSelected ? COLORS.LightBlue : COLORS.Text.grey;
        const handleOnPressItem = () => {
          doHapticFeedback();
          onDaySelected(index);
        };

        return (
          <WeekDateItem
            key={`${weekDay}-${index}`}
            isSelected={isSelected}
            onPress={handleOnPressItem}>
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
      }),
    [selectedDays, onDaySelected],
  );

  return (
    <Root>
      <FormLabel value={`What days does ${childName} get this done?`} />
      <Row justifyContent={'space-between'}>{renderDays}</Row>
    </Root>
  );
};

export {TaskDaySelector};
