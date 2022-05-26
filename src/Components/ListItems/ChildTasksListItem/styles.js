import styled from 'styled-components/native';
import {COLORS} from '../../../Constants/Colors';

export const Container = styled.View`
  width: 100%;
  heigth: 80px;
  background-color: ${COLORS.White};
  border-radius: 16px;
  padding-left: 20px;
  padding-vertical: 16px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

export const Details = styled.View`
  flex: 1;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;