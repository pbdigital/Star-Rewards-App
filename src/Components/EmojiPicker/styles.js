import styled from 'styled-components/native';
import {COLORS} from 'Constants';

export const Container = styled.TouchableOpacity`
  width: 130px;
  align-self: center;
`;
export const EmojiContainer = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  border-width: 2px;
  border-color: ${({hasError}) =>
    hasError ? COLORS.LightRed : COLORS.LightBlue};
  background-color: ${COLORS.White};
  align-items: center;
  justify-content: center;
  align-self: center;
`;
