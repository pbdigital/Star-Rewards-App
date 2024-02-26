import styled from 'styled-components/native';
import {COLORS} from 'Constants';
import {StyleSheet} from 'react-native';

export const Root = styled.View``;

export const Container = styled.View`
  padding-horizontal: 20px;
`;

export const StatsRow = styled.View`
  flex-direction: row;
  width: 100%;
  padding-top: 24px;
`;

export const StatsSpacer = styled.View`
  width: 20px;
`;

export const StatsViewItem = styled.View`
  border-radius: 12px;
  background-color: ${COLORS.White};
  overflow: hidden;
  flex: 1px;
`;

export const StatsViewItemValueContainer = styled.View`
  border-width: 2px;
  border-color: ${COLORS.Blue};
  border-radius: 12px;
  margin: 20px;
  align-items: center;
`;

export const Scroll = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingTop: 23,
    flexGrow: 1,
  },
}))``;

export const styles = StyleSheet.create({
  statsItemLabel: {
    backgroundColor: COLORS.Blue,
    width: '100%',
    overflow: 'hidden',
    paddingVertical: 5,
  },
});
