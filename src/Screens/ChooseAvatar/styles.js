import styled from 'styled-components/native';
import {COLORS} from '../../Constants/colors';

export const Container = styled.View`
  flex-grow: 1;
`;

export const Content = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  align-items: center;
  justify-content: center;
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

export const Footer = styled.View`
  background-color: ${COLORS.Background};
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 16px;
  width: 100%;
`;
