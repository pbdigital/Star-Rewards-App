import {isNumber} from 'lodash';
import styled from 'styled-components/native';
import {COLORS} from 'Constants';

export const RootTouchable = styled.TouchableOpacity`
  background-color: ${COLORS.White};
  border-radius: 16px;
  width: ${({width}) => (width ? width : '100%')};
  height: 160px;
  max-height: 160px;
  padding-horizontal: 10px;
  padding-top: 8px;
  align-items: center;
  padding-bottom: ${({paddingBottom}) =>
    isNumber(paddingBottom) ? paddingBottom : 30}px;
`;

export const Card = styled.View`
  background-color: ${COLORS.White};
  opacity: ${({opacity}) => opacity || 1.0};
  width: 100%;
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

export const StarPlaceholder = styled.View`
  height: 31px;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 36px;
  height: 36px;
  border-radius: 36px;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.Red};
  position: absolute;
  right: -10px;
  top: -10px;
`;

export const IconWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
