import styled from 'styled-components/native';
import {Default} from 'Constants/Defaults';

export const BottomCloud = styled.View`
  position: absolute;
  bottom: 20%;
  left: 0;
  width: 100%;
`;

export const BottomCloudImageLeft = styled.View`
  margin-left: 18%;
  margin-top: 38px;
`;

export const BottomCloudImageRight = styled.View`
  align-self: flex-end;
  margin-right: 10%;
`;

export const TopCloud = styled.View`
  position: absolute;
  top: 58px;
  left: 0;
  width: 100%;
`;

export const MiddleCloud = styled.View`
  position: absolute;
  top: ${Default.Dimensions.Height / 2 - 48}px;
  width: 100%;
`;
