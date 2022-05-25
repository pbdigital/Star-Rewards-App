import styled from 'styled-components/native';
import {COLORS} from '../../../Constants/Colors';

export const Container = styled.TouchableOpacity`
  border-radius: 16px;
  padding-vertical: 10px;
  justify-content: center;
  align-items: center;
  padding-horizontal: 10px;

  ${({isCurrentDay}) =>
    isCurrentDay
      ? `background-color: ${COLORS.Background.calendarDayCurrentDay};`
      : ''}
`;

export const Circle = styled.View`
  height: 24px;
  width: 24px;
  border-radius: 24px;
  border-width: 3px;
  border-color: ${COLORS.LightBlue};
  margin-vertical: 6px;
`;
