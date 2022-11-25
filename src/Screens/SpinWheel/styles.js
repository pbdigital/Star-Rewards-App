import styled from 'styled-components/native';
import {COLORS} from 'Constants';

export const Content = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const Footer = styled.View`
  background-color: ${COLORS.Background.screen};
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 16px;
  width: 100%;
`;

export const SafeAreaFooter = styled.View`
  background-color: ${COLORS.Background.screen};
  padding-top: 30px;
`;
