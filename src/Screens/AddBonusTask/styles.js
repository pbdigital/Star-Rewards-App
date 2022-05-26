import styled from 'styled-components/native';
import {COLORS} from '../../Constants/Colors';

export const Container = styled.View`
  flex-grow: 1;
`;

export const Content = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  padding-top: 30px;
`;

export const Footer = styled.View`
  background-color: ${COLORS.Background.screen};
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 16px;
  width: 100%;
`;

export const PaddedHorizontal = styled.View`
  padding-horizontal: 16px;
  width: 100%;
`;
