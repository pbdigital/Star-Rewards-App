import styled from 'styled-components/native';
import {COLORS} from 'Constants';
import {StyleSheet} from 'react-native';

export const Container = styled.View`
  margin-horizontal: 20px;
  flex: 1;
  margin-bottom: 20px;
`;

export const FormElementContainer = styled.View`
  margin-top: 31px;
`;

export const Form = styled.View`
  flex: 1;
`;

export const RadioButtonContainer = styled.View`
  flex-direction: row;
`;

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

export const RadioButtonSpacer = styled.View`
  width: 12px;
`;

export const Padded = styled.View`
  padding-top: 30px;
  width: 100%;
`;

export const StarAdjustmentButton = styled.TouchableOpacity`
  background-color: ${COLORS.White};
  width: 100%;
  padding-vertical: 18px;
  padding-horizontal: 20px;
  border-radius: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const styles = StyleSheet.create({
  multilineTextInput: {
    minHeight: 150,
    color: COLORS.Text.grey,
    textAlignVertical: 'top',
  },
  radSetTotalValueContainer: {
    marginTop: 30,
  },
});
