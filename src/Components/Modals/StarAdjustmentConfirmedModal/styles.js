import styled from 'styled-components/native';
import {COLORS} from 'Constants';
import {StyleSheet} from 'react-native';

export const AlertContainer = styled.View`
  background-color: rgba(248, 248, 248, 0.95);
  border-radius: 14px;
  width: 90%;
  align-self: center;
  padding-top: 20px;
  padding-left: 23px;
  padding-right: 23px;
  padding-bottom: 38px;
`;

export const Col = styled.View`
  align-items: center;
  padding-top: 4px;
  margin-top: 30px;
`;

export const CloseIconButton = styled.TouchableOpacity`
  align-self: flex-end;
`;

export const styles = StyleSheet.create({
  starAdjustmentImage: {
    alignSelf: 'center',
  },
});
