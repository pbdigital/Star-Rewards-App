import {COLORS} from 'Constants';
import {StyleSheet} from 'react-native';
import Styled from 'styled-components/native';

export const ModalContentContaiener = Styled.View`
  background-color: ${COLORS.LightGreen};
  flex: 1;
`;

export const ScreenImageContainer = Styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const CloseIconContainer = Styled.View`
  position: absolute;
  top: 56px;
  left: 16px;
`;

export const CtaButtonContainer = Styled.View`
  height: 391px;
  background-color: ${COLORS.White};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding-top: 38px;
  padding-horizontal: 35px;
`;

export const NotesContainer = Styled.View`
  margin-bottom: 25px;
`;

export const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-start',
  },
});
