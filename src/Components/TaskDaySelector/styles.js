import styled from 'styled-components/native';
import {COLORS} from 'Constants/Colors';

export const Root = styled.View`
  width: 100%;
`;

export const Row = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding-top: ${({paddingTop}) => paddingTop || 0}px;
  justify-content: ${({justifyContent}) => justifyContent || 'flex-start'};
`;

export const WeekDateItem = styled.TouchableOpacity`
  width: 40px;
  height: 52px;
  background-color: ${COLORS.White};
  align-item: center;
  justify-content: center;
  border-radius: 10px;

  ${({isSelected}) => {
    return !isSelected
      ? ''
      : `
        border-color: ${COLORS.LightBlue};
        border-width: 2px;
      `;
  }}
`;
