import styled from 'styled-components/native';
import {COLORS} from 'Constants/Colors';

export const Root = styled.SafeAreaView`
  background-color: ${COLORS.Background.screen};
  flex: 1;
`;

export const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingBottom: 16,
    flexGrow: 1,
  },
}))``;

export const Content = styled.View`
  flex: 1;
  flex-grow: 1;
  padding-top: 30px;
  align-items: flex-start;
  padding-horizontal: 20px;
`;

export const ItemContainer = styled.View`
  background-color: ${COLORS.White};
  padding-horizontal: 20px;
  padding-vertical: 16px;
  width: 100%;
  border-radius: 16px;
  align-items: flex-start;
  margin-top: ${({marginTop}) => marginTop || 0}px;
  margin-left: ${({marginLeft}) => marginLeft || 0}px;
  margin-right: ${({marginRight}) => marginRight || 0}px;
  margin-bottom: ${({marginBottom}) => marginBottom || 0}px;
`;

export const Padded = styled.View`
  padding-horizontal: 20px;
  width: 100%;
`;

export const SuccessModalContaier = styled.View`
  align-items: center;
  padding-top: 11px;
  padding-bottom: 53px;
  padding-horizontal: 36px;
`;
