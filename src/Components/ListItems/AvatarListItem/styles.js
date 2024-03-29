import styled from 'styled-components/native';
import {COLORS} from 'Constants';

export const Container = styled.TouchableOpacity`
  width: 110px;
  heigth: 110px;
  background-color: ${COLORS.White};
  border-radius: 16px;
  align-items: center;
  justify-content: center;

  ${({isSelected}) => {
    return !isSelected
      ? ''
      : `
        border-color: ${COLORS.LightBlue};
        border-width: 4px;
      `;
  }}
`;
