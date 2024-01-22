import styled from 'styled-components/native';
import {COLORS} from 'Constants';
import {Platform} from 'react-native';

export const Root = styled.View`
  width: 100%;
  margin-bottom: ${({marginBottom}) => marginBottom || 0}px;
`;

export const InputContainer = styled.View`
  background-color: ${COLORS.White};
  border-radius: 16px;
  padding-horizontal: 20px;
  padding-vertical: ${Platform.OS === 'ios' ? 16 : 12}px;
`;
