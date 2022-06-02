import styled from 'styled-components/native';
import {COLORS} from '../../Constants/Colors';

export const AlertContainer = styled.View`
  background-color: rgba(248, 248, 248, 0.95);
  border-radius: 14px;
  width: 90%;
  align-self: center;
  padding-top: 20px;
`;

export const Col = styled.View`
  align-items: center;
  padding-horizontal: 20px;
  padding-top: 4px;
`;

export const Button = styled.TouchableOpacity`
  padding-vertical: 15px;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

export const CloseIconButton = styled.TouchableOpacity`
  align-self: flex-end;
  padding-right: 20px;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
  margin-top: 24px;
  border-top-width: 1px;
  border-color: ${COLORS.Background.border};
`;

export const Divider = styled.View`
  background-color: ${COLORS.Background.border};
  width: 1px;
`;
