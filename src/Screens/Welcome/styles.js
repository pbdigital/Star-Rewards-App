import styled from 'styled-components/native';
import {COLORS} from 'Constants';

export const Button = styled.TouchableOpacity`
  padding-vertical: 15px;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
  margin-top: 31px;
  margin-bottom: 15px;
  padding-horizontal: 20px;
  border-color: ${COLORS.Background.border};
`;

export const FooterContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
