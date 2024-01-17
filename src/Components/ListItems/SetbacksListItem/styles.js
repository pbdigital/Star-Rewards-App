import styled from 'styled-components/native';
import {COLORS} from 'Constants';

export const Container = styled.View`
  width: 100%;
  heigth: 80px;
  background-color: ${COLORS.White};
  border-radius: 16px;
  padding-horizontal: 20px;
  padding-vertical: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${({marginTop}) => marginTop || 0}px;
  margin-left: ${({marginLeft}) => marginLeft || 0}px;
  margin-right: ${({marginRight}) => marginRight || 0}px;
  margin-bottom: ${({marginBottom}) => marginBottom || 0}px;
`;

export const Details = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

export const BonusStarInfo = styled.ImageBackground`
  flex-direction: row;
  align-items: center;
  width: 32px;
  height: 30px;
  justify-content: center;
`;

export const Padded = styled.View`
  width: 100%;
  margin-bottom: 16px;
`;

export const ItemImage = styled.Image`
  width: 40px;
  height: 40px;
`;

export const ItemContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;
