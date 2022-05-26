import styled from 'styled-components/native';

export const Root = styled.View`
  width: 100%;
`;

export const Row = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    paddingLeft: 16,
  },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
}))`
  width: 100%;
  padding-top: ${({paddingTop}) => paddingTop || 0}px;
`;
