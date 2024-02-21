import styled from 'styled-components/native';

export const AlertContainer = styled.View`
  background-color: rgba(248, 248, 248, 0.95);
  border-radius: 14px;
  width: 90%;
  align-self: center;
  padding-top: 20px;
  padding-left: 23px;
  padding-right: 23px;
  padding-bottom: 38px;
`;

export const Col = styled.View`
  align-items: center;
  padding-horizontal: 20px;
  padding-top: 4px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-horizontal: 20px;
  padding-top: 4px;
`;

export const CloseIconButton = styled.TouchableOpacity`
  align-self: flex-end;
`;

export const BonusStarInfo = styled.ImageBackground`
  flex-direction: row;
  align-items: center;
  width: 60px;
  height: 60px;
  justify-content: center;
`;

export const ItemImage = styled.Image`
  width: 60px;
  height: 60px;
  margin-right: 20px;
`;
