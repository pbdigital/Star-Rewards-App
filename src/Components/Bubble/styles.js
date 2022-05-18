import styled from 'styled-components/native';
import {COLORS} from '../../Constants/Colors';

export const WelcomeBubble = styled.View`
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: ${COLORS.White};
  padding-vertical: 16px;
  padding-horizontal: 20px;
  margin-bottom: 34px;
  z-index: 1;
`;
