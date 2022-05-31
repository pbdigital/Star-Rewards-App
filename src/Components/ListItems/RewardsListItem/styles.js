import {isNumber} from 'lodash';
import styled from 'styled-components/native';
import {COLORS} from '../../../Constants/Colors';

export const Card = styled.TouchableOpacity`
  background-color: ${COLORS.White};
  border-radius: 16px;
  width: 46%;
  height: 160px;
  max-height: 160px;
  padding-horizontal: 10px;
  padding-top: 8px;
  opacity: ${({opacity}) => opacity || 1.0};
  align-items: center;
  padding-bottom: ${({paddingBottom}) =>
    isNumber(paddingBottom) ? paddingBottom : 30}px;
`;

export const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

export const AddItemContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
