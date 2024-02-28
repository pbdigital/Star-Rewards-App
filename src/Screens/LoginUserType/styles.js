import styled from 'styled-components/native';
import {COLORS} from 'Constants';

export const Root = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingHorizontal: 38,
    backgroundColor: COLORS.Background.screen,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
}))`
  background-color: ${COLORS.Background.screen};
`;

export const SelectorButton = styled.TouchableOpacity`
  width: 100%;
  height: 240px;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.White};
  border-width: 4px;
  margin-top: ${({marginTop}) => marginTop ?? 0}px;
  border-color: ${({borderColor}) => borderColor ?? COLORS.Blue};
  border-radius: 16px;
`;

export const SelectorText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${COLORS.Text.black};
  margin-top: 30px;
`;
