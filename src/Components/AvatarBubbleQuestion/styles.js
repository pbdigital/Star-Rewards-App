import styled from 'styled-components/native';
import {COLORS} from '../../Constants/Colors';

export const Container = styled.View`
  margin-top: 26px;
  margin-horizontal: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Bubble = styled.View`
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background-color: ${COLORS.White};
  padding-vertical: 16px;
  padding-horizontal: 20px;
  z-index: 1;
  flex: 1;
  margin-left: 15px;
`;
