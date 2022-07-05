import styled from 'styled-components/native';
import {COLORS} from 'Constants/Colors';

export const Content = styled.View`
  flex: 1;
  padding-top: 22px;
  overflow: hidden;
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

export const AvatarWelcomeContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const ListContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`;
