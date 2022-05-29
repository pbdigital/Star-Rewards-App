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
  margin-top: ${({marginTop}) => marginTop || 0}px;
  margin-left: ${({marginLeft}) => marginLeft || 0}px;
  margin-right: ${({marginRight}) => marginRight || 0}px;
  margin-bottom: ${({marginBottom}) => marginBottom || 0}px;
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

export const BonusStarInfo = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;
