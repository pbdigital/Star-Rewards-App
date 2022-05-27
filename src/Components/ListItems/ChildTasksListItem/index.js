import React, { useMemo } from 'react';
import {COLORS} from '../../../Constants/Colors';
import {Image} from '../../Image';
import {Images} from '../../../Assets/Images';
import {Text} from '../../Text';
import {CloseButton, Container, Details} from './styles';
import moment from 'moment';

const weekDates = moment
  .weekdays()
  .map(day => day.split('').splice(0, 3).join(''));

const ChildTasksListItem = ({
  childId,
  daysofWeek,
  id,
  isBonusTask,
  name,
  starsAwarded,
  hideCloseButton,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
}) => {
  const taskFrequency = useMemo(() => {
    if (daysofWeek?.length >= 7) {
      return 'Everyday';
    }

    const selectedDays = daysofWeek.map(dayIndex => weekDates[dayIndex]);
    return selectedDays.join(', ');
  }, [daysofWeek]);

  const handleOnPressCloseButton = () => {};

  return (
    <Container
      marginTop={marginTop}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
      marginRight={marginRight}>
      <Details>
        <Text
          fontSize={18}
          fontWeight="600"
          lineHeight={27}
          color={COLORS.Text.black}>
          {name}
        </Text>
        <Text
          fontSize={14}
          fontWeight="400"
          lineHeight={21}
          color={COLORS.Blue}>
          {taskFrequency}
        </Text>
      </Details>
      {!hideCloseButton && (
        <CloseButton onPress={handleOnPressCloseButton}>
          <Image source={Images.IcClose} width={12} height={12} />
        </CloseButton>
      )}
    </Container>
  );
};

export {ChildTasksListItem};
