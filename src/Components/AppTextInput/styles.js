import styled from 'styled-components/native';
import {COLORS} from 'Constants';

export const Root = styled.View`
  width: 100%;
  margin-bottom: ${({marginBottom}) => marginBottom || 0}px;
`;

export const InputContainer = styled.View`
  background-color: ${COLORS.White};
  border-radius: 16px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 16px;
  padding-bottom: 16px;
`;
