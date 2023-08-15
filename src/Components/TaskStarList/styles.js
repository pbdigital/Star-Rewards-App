import styled from 'styled-components/native';

export const Container = styled.View`
  margin-top: 26px;
  width: 100%;
`;

export const StarContainer = styled.View`
  width: 285px;
  height: 152px;
  align-self: center;
  z-index: ${({zIndex}) => zIndex ?? 9999};
  margin-bottom: 30px;
`;
