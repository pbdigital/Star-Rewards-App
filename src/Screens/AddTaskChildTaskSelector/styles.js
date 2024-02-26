import styled from 'styled-components/native';
import {COLORS} from '../../Constants';

export const Container = styled.View`
  padding-horizontal: 20px;
  padding-bottom: 100px;
`;

export const AddTaskBullet = styled.View`
  width: 24px
  height: 24px;
  border-width: 2px;
  border-color: ${COLORS.Background.border2};
  border-radius: 24px;
`;

export const ListHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 58px;
`;

export const ItemMetaDataContainer = styled.View`
  align-items: flex-start;
  flex: 1;
`;

export const ItemContainer = styled.TouchableOpacity`
  background-color: ${COLORS.White};
  flex-direction: row;
  border-radius: 16px;
  margin-bottom: 16px;
  align-items: center;
  padding-vertical: 14px;
  padding-horizontal: 20px;
  justify-content: space-between;
`;

export const FooterContainer = styled.View`
  width: 100%;
  align-items: center;
  padding-horizontal: 20px;
  background-color: ${COLORS.White};
  padding-bottom: 32px;
  padding-top: 20px;
`;

export const List = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  showsVerticalScrollIndicator: false,
}))`
  margin-top: 20px;
`;

export const StarsAwardedContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
