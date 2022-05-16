import styled from 'styled-components/native';
import {COLORS} from '../../Constants/colors';

export const Root = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const Content = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.Background};
`;

export const Container = styled.View`
  background-color: ${COLORS.Background};
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

export const TextInput = styled.TextInput`
  width: 80%;
  height: 72px;
  color: ${COLORS.Blue};
  text-align: center;
  font-size: 48px;
  font-weight: 600;
  margin-top: 16px;
  padding-top: 0;
  padding-bottom: 0;
`;
