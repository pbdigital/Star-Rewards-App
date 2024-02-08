import styled from 'styled-components/native';
import { COLORS } from '../../../Constants';

export const AlertContainer = styled.View`
  background-color: ${COLORS.White};
  border-radius: 14px;
  width: 90%;
  align-self: center;
  padding-top: 20px;
  padding-left: 23px;
  padding-right: 23px;
  padding-bottom: 38px;
`;

export const CloseIconButton = styled.TouchableOpacity`
  align-self: flex-end;
`;

export const ItemImage = styled.Image`
  width: 60px;
  height: 60px;
  margin-right: 20px;
`;

export const AddTaskSelectorItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px;
`;

export const AddTaskBullet = styled.TouchableOpacity`
  width: 24px
  height: 24px;
  border-width: 2px;
  border-color: ${COLORS.Background.border2};
  border-radius: 24px;
`;
