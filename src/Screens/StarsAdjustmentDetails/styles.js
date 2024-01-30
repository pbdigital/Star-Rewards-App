import styled from 'styled-components/native';
import {COLORS} from 'Constants';

export const Container = styled.View`
  margin-horizontal: 25px;
  border-radius: 24px;
  padding: 24px;
  padding-top: 20px;
  background-color: ${COLORS.White};
  margin-top: 39px;
  flex: 1;
`;

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

export const DescriptionContainer = styled.View`
  background-color: ${COLORS.White};
  padding-vertical: 20px;
`;

export const ItemContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${COLORS.White};
  padding-vertical: 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.Background.border};
`;
