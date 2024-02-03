import styled from 'styled-components/native';
import {COLORS} from 'Constants';
import {Dimensions} from 'react-native';

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
export const BottomSheetContainer = styled.View`
  width: 100%;
  height: ${Dimensions.get('screen').height / 2}px;
`;
