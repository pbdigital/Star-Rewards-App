import styled from 'styled-components/native';

export const ToolBarContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 40px;
`;

export const BackButtonContainer = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  justify-content: center;
  position: absolute;
  left: 0;
  z-index: 9999;
`;

export const TitleContainer = styled.View`
  width: 100%;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;
