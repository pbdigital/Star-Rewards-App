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
  padding-top: 4px;
`;

export const CloseIconButton = styled.TouchableOpacity`
  align-self: flex-end;
`;

export const StarContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
`;

export const StarImage = styled.Image`
  width: 63px;
  height: 60px;
`;
