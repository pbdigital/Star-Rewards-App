import styled from 'styled-components/native';
import {COLORS} from 'Constants';

export const Root = styled.TouchableOpacity`
  margin-top: ${({marginTop}) => marginTop || 0}px;
  margin-left: ${({marginLeft}) => marginLeft || 0}px;
  margin-right: ${({marginRight}) => marginRight || 0}px;
  margin-bottom: ${({marginBottom}) => marginBottom || 0}px;
`;

export const Container = styled.View`
  width: 100%;
  heigth: 80px;
  background-color: ${COLORS.White};
  border-radius: 16px;
  padding-horizontal: 20px;
  padding-vertical: 14px;
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
  justify-content: center;
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
  width: 20px;
  height: 18px;
  justify-content: center;
`;

export const Padded = styled.View`
  padding-horizontal: 20px;
  width: 100%;
`;

export const TopContent = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const BottomContent = styled.View`
  align-items: flex-end;
  flex-direction: row;
  justify-content: space-between;
`;

export const StarContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
