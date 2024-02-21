import styled from 'styled-components/native';

export const Padded = styled.View`
  padding-horizontal: 20px;
  width: 100%;
`;

export const Content = styled.View`
  margin-top: 30px;
`;

export const Root = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
  },
}))``;
