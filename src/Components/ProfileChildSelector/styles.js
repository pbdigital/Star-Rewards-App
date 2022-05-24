import styled from 'styled-components/native';
import {COLORS} from '../../Constants/Colors';

export const Container = styled.View`
  flex-direction: row;
  background-color: red;
  align-items: center;
`;

export const SelectDropdown = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: blue;
`;

export const AvatarContainer = styled.View`
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
