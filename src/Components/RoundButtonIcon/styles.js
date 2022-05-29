import styled from 'styled-components/native';
import {COLORS} from '../../Constants/Colors';

export const Container = styled.TouchableOpacity`
  width: ${({size}) => size || 50}px;
  height: ${({size}) => size || 50}px;
  border-radius: ${({size}) => size || 50}px;
  background-color: ${({backgroundColor}) => backgroundColor || COLORS.White};
  align-items: center;
  justify-content: center;
  ${({marginRight}) => marginRight && `margin-right: ${marginRight}px`};
`;
