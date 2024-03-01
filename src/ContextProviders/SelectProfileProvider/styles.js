import styled from 'styled-components/native';
import {COLORS} from 'Constants';

export const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: ${({justifyContent}) => justifyContent || 'space-between'};
  align-items: center;
  border-bottom-width: ${({borderNone}) => (borderNone ? 0 : 1)}px;
  border-bottom-color: ${COLORS.Background.border};
  padding-vertical: ${({paddingVertical}) =>
    paddingVertical ? paddingVertical : 24}px;
`;

export const SafeAreaView = styled.SafeAreaView`
  background-color: ${COLORS.White};
`;

export const SettingsButton = styled.TouchableOpacity``;

export const Container = styled.View`
  background-color: ${COLORS.White};
  border-bottom-left-radius: 36px;
  border-bottom-right-radius: 36px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const AvatarContainer = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: ${COLORS.White};
  border-width: 4px;
  border-color: ${COLORS.Blue};
  justify-content: center;
  align-items: center;
`;

export const Profile = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const AddChildButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const ToggleButtonContainer = styled.View`
  height: 20px;
  width: 30%;
  justify-content: flex-start;
  align-items: center;
  align-self: center;
`;

export const Toggle = styled.View`
  height: 5px;
  background-color: ${COLORS.White};
  width: 134px;
  align-self: center;
  border-radius: 100px;
`;
