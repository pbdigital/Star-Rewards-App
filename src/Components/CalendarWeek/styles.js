import styled from 'styled-components/native';
import {COLORS} from 'Constants';

export const Content = styled.View`
  background-color: ${COLORS.DarkBlue};
  border-radius: 16px;
  padding-vertical: 10px;
  padding-horizontal: 17px;
  margin-horizontal: 20px;
`;

export const DayContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 7px;
`;

export const ScrollContainer = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingRight: 8,
  },
  showsHorizontalScrollIndicator: false,
  horizontal: true,
}))``;
