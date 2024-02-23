import styled from 'styled-components/native';
import {COLORS} from '../../../Constants';

export const Container = styled.TouchableOpacity``;
export const Star = styled.ImageBackground`
  width: 110px;
  height: 104px;
  justify-content: center;
  align-items: center;
`;

export const StarOffer = styled.ImageBackground`
  width: 126px;
  height: 121px;
  justify-content: center;
  align-items: center;
`;

export const ListStarViewItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  background-color: ${COLORS.White};
  padding: 16px;
  margin-bottom: 16px;
  margin-horizontal: 16px;
`;

export const ListStarViewItemMetaContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
