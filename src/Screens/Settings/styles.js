import styled from 'styled-components/native';
import {COLORS} from 'Constants';

export const Root = styled.SafeAreaView`
  background-color: ${COLORS.Background.screen};
  flex: 1;
`;

export const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    paddingBottom: 100,
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

export const AvatarChangeButton = styled.TouchableOpacity`
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

export const LabelContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({marginTop}) => marginTop || 0}px;
  margin-bottom: ${({marginBottom}) => marginBottom || 0}px;
`;

export const SmallAddIconButton = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  background-color: ${({disabled}) =>
    disabled ? COLORS.Text.lightGrey : COLORS.Green};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const ListWrapper = styled.View`
  width: 100%;
`;

export const Padded = styled.View`
  padding-horizontal: 20px;
  width: 100%;
  margin-top: ${({marginTop}) => marginTop ?? 0}px;
  margin-bottom: ${({marginBottom}) => marginBottom ?? 0}px;
`;

export const SuccessModalContaier = styled.View`
  align-items: center;
  padding-top: 11px;
  padding-bottom: 53px;
  padding-horizontal: 36px;
`;

export const StarAdjustmentButton = styled.TouchableOpacity`
  background-color: ${COLORS.White};
  width: 100%;
  padding-vertical: 18px;
  padding-horizontal: 20px;
  border-radius: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SaveButtonContainer = styled.View`
  padding-horizontal: 20px;
  width: 100%;
  position: absolute;
  bottom: 20px;
`;

export const ChildAccessItemContainer = styled.View`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  background-color: ${COLORS.White};
  border-radius: 16px;
  padding: 20px;
`;

export const ChildAccessContainer = styled.View`
  margin-top: 40px;
  justify-content: space-between;
`;

export const ChildAccessContent = styled.View``;
