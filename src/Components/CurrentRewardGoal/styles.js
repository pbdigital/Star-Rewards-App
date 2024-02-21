import styled from 'styled-components/native';
import {COLORS} from 'Constants';

export const Container = styled.View`
  border-width: 2px;
  border-color: ${COLORS.Blue};
  border-radius: 16px;
  margin-horizontal: 20px;
  overflow: hidden;
  background-color: ${COLORS.White};
`;

export const Header = styled.View`
  background-color: ${COLORS.Blue};
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding-horizontal: 20px;
  padding-vertical: 16px;
`;

export const Reward = styled.View`
  flex-direction: row;
  padding-vertical: 30px;
  padding-horizontal: 16px;
  align-items: center;
`;

export const Stats = styled.View``;

export const Details = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const MedalIcon = styled.Image``;

export const Content = styled.View`
  flex: 1;
`;

export const ProgressBarContainer = styled.View`
  width: 100%;
  height: 10px;
  margin-top: 8px;
  margin-bottom: 4px;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  padding-horizontal: 20px;
  padding-bottom: 30px;
`;
