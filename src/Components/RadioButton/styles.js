import styled from 'styled-components/native';
import {COLORS} from 'Constants';
import {StyleSheet} from 'react-native';

export const RadioButtonRoot = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px;
  background-color: ${COLORS.White};
  border-radius: 12px;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

export const DotActive = styled.View`
  height: 24px;
  width: 24px;
  border-radius: 24px;
  border-width: 8px;
  border-color: ${COLORS.Green};
`;

export const DotInActive = styled.View`
  height: 24px;
  width: 24px;
  border-radius: 24px;
  border-width: 2px;
  border-color: #B7BABC;
`;

export const styles = StyleSheet.create({
  multilineTextInput: {
    minHeight: 150,
    color: COLORS.Text.grey,
  },
});
