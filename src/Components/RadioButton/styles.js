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

export const InlineDotInActive = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  border-width: 2px;
  border-color: ${COLORS.Text.grey};
`;

export const InlineDotActive = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  border-width: 2px;
  border-color: ${COLORS.Green};
  align-items: center;
  justify-content: center;
`;

export const InlineDotActivePoint = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 12px;
  background-color: ${COLORS.Green};
`;

export const InlineDotContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const styles = StyleSheet.create({
  multilineTextInput: {
    minHeight: 150,
    color: COLORS.Text.grey,
  },
});
