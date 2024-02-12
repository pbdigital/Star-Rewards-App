import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-horizontal: 20px;
  padding-top: 30px;
  justify-content: space-between;
`;

export const ButtonContainer = styled.View``;

export const ToolbarContainer = styled.View`
  padding-horizontal: 20px;
`;

export const styles = StyleSheet.create({
  label: {
    paddingBottom: 8,
  },
  starSelectorContainer: {
    paddingBottom: 30,
  },
});
