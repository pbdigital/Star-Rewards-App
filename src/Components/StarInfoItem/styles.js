import styled from 'styled-components/native';
import {COLORS} from 'Constants';

export const StarContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const BonusStarInfo = styled.ImageBackground`
  flex-direction: row;
  align-items: center;
  width: 20px;
  height: 18px;
  justify-content: center;
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-vertical: 20px;
  ${({hasBottomBorder}) => hasBottomBorder && 'border-bottom-width: 1px;'}
  ${({hasBottomBorder}) =>
    hasBottomBorder && `border-bottom-color: ${COLORS.Background.border};`}
`;
