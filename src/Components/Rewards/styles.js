import styled from 'styled-components/native';
import {COLORS} from 'Constants';

export const Content = styled.View`
  flex: 1;
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
`;

export const SuccessMonsterAvatar = styled.View`
  flex-grow: 1;
  justify-content: center;
`;

export const TaskListWrapper = styled.View`
  justify-content: space-between;
  flex: 1;
  padding-bottom: 30px;
`;

export const CloudContainer = styled.View`
  margin-top: -80px;
`;
