import styled from 'styled-components/native';
import {COLORS} from 'Constants';

export const Root = styled.SafeAreaView`
  flex: 1;
  background-color: ${COLORS.Background.screen};
`;

export const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingHorizontal: 38,
    backgroundColor: COLORS.Background.screen,
    // justifyContent: 'space-between',
    alignItems: 'center',
    // flex: 1,
    flexGrow: 1,
    
  },
}))`
  background-color: ${COLORS.Background.screen};
`;

export const SelectorButton = styled.TouchableOpacity`
  height: 156px;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.White};
  border-radius: 16px;
  flex-basis: 45%;
  margin-bottom: 30px;
  align-self: center;
`;

export const SelectorText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${COLORS.Text.black};
  margin-top: 30px;
`;
