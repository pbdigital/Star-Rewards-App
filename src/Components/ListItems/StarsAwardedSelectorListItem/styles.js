import styled from 'styled-components/native';
import {COLORS} from 'Constants';

export const Item = styled.TouchableOpacity`
  width: 56px;
  height: 56px;
  border-radius: 56px;
  background-color: ${COLORS.White};
  align-item: center;
  justify-content: center;
  margin-right: 10px;

  ${({isSelected}) => {
    return !isSelected
      ? ''
      : `
        border-color: ${COLORS.LightBlue};
        border-width: 2px;
      `;
  }}
`;
