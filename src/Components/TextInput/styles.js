import styled from 'styled-components/native';
import {COLORS} from 'Constants';

export const Container = styled.View`
  flex-direction: row;
  border-width: 1px;
  border-color: ${COLORS.Text.lightGrey};
  border-radius: 8px;
  padding: 15px;
  margin-top: ${({marginTop}) => marginTop || 0}px;
  margin-bottom: ${({marginBottom}) => marginBottom || 0}px;
  background-color: white;
  shadow-offset: 0px 5px;
  shadow-radius: 2px;
  shadow-color: rgba(0, 0, 0, 0.05);
  shadow-opacity: 0.5;
`;

export const LeftIcon = styled.Image`
  width: 18px;
  height: 18px;
  resize-mode: contain;
  margin-right: 9px;
`;

export const RightIcon = styled.Image`
  width: 20px;
  height: 20px;
  resize-mode: contain;
  margin-right: 9px;
`;

export const TogglePasswordIcon = styled.Image`
  width: 18px;
  height: 18px;
  resize-mode: contain;
  margin-left: 9px;
`;

export const StyledTextInput = styled.TextInput`
  font-size: 16px;
  color: ${COLORS.Text.black};
  flex: 1;
`;
