import styled from 'styled-components/native';
import {COLORS} from '../../Constants/Colors';

export const Root = styled.SafeAreaView`
  background-color: ${COLORS.Background.screen};
  flex: 1;
`;

export const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingBottom: 16,
    flexGrow: 1,
  },
}))``;

export const Content = styled.View`
  flex: 1;
  flex-grow: 1;
  padding-top: 32px;
  align-items: flex-start;
  padding-bottom: 34px;
`;

export const AvatarContainer = styled.View`
  height: 100px;
  width: 100px;
  border-radius: 100px;
  background-color: ${COLORS.White};
  justify-content: center;
  align-items: center;
  align-self: center;
  border-color: ${COLORS.LightBlue};
  border-width: 4px;
`;

export const AvatarChangeButton = styled.View`
  justify-content: center;
  align-items: center;
  align-self: center;
`;

export const ItemContainer = styled.View`
  background-color: ${COLORS.White};
  padding-horizontal: 20px;
  padding-vertical: 16px;
  width: 100%;
  border-radius: 16px;
  align-items: flex-start;
  margin-top: ${({marginTop}) => marginTop || 0}px;
  margin-left: ${({marginLeft}) => marginLeft || 0}px;
  margin-right: ${({marginRight}) => marginRight || 0}px;
  margin-bottom: ${({marginBottom}) => marginBottom || 0}px;
`;

export const Padded = styled.View`
  padding-horizontal: 20px;
  width: 100%;
`;

export const InfoContainer = styled.View`
  background-color: ${COLORS.White};
  border-radius: 16px;
  padding-horizontal: 20px;
  padding-vertical: 24px;
  width: 100%;
  margin-top: 40px;
`;

export const InfoItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  padding-top: ${({paddingTop}) => paddingTop || 0}px;
  padding-left: ${({paddingLeft}) => paddingLeft || 0}px;
  padding-right: ${({paddingRight}) => paddingRight || 0}px;
  padding-bottom: ${({paddingBottom}) => paddingBottom || 0}px;
  align-items: center;
  border-bottom-width: ${({borderBottomWidth}) => borderBottomWidth || 0}px;
  border-color: ${COLORS.Background.border};
`;
