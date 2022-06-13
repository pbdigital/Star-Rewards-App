import styled from 'styled-components/native';
import {COLORS} from '../../Constants/Colors';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SelectDropdown = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  margin-right: 8px;
`;

export const AvatarContainer = styled.TouchableOpacity`
  width: 56px;
  height: 56px;
  border-color: ${COLORS.Blue};
  border-radius: 56px;
  border-width: 4px;
  background-color: ${COLORS.White};
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;
