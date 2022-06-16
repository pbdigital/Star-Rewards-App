import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-horizontal: 30px;
`;

export const Content = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    paddingTop: 30,
    paddingBottom: 10,
  },
  showsVerticalScrollIndicator: false,
}))``;

export const Form = styled.View`
  margin-top: 30px;
  flex-grow: 1;
`;
