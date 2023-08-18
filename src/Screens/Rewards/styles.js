import {COLORS} from 'Constants';
import styled from 'styled-components/native';

export const SuccessNotificationContainer = styled.View`
  padding-horizontal: 55px;
  padding-bottom: 60px;
  padding-top: 24px;
`;

export const ConfirmAwardNotificationContainer = styled.View`
  margin-horizontal: 30px;
  padding-horizontal: 30px;
  padding-bottom: 30px;
`;

export const WelcomeContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const AvatarWelcomeContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding-bottom: 16px;
`;

export const Footer = styled.View`
  background-color: ${COLORS.Background.screen};
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
`;

export const SafeAreaFooter = styled.View`
  background-color: ${COLORS.Background.screen};
  padding-top: 30px;
`;
