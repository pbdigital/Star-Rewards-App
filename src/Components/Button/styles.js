import styled from 'styled-components/native';
import {COLORS} from 'Constants';

const BUTTON_HEIGHT = 60;

export const ButtonWrapper = styled.TouchableOpacity`
  height: ${({height}) => height || BUTTON_HEIGHT}px;
  width: ${({width}) => (width ? `${width}px` : '100%')};
  margin-top: ${({marginTop}) => marginTop || 0}px;
  margin-left: ${({marginLeft}) => marginLeft || 0}px;
  margin-right: ${({marginRight}) => marginRight || 0}px;
  margin-bottom: ${({marginBottom}) => marginBottom || 0}px;
  ${({alignSelf}) => (alignSelf ? `align-self: ${alignSelf};` : '')}
`;

export const ButtonContent = styled.View`
  background-color: ${({backgroundColor}) => backgroundColor || COLORS.blue};
  height: ${({height}) => height || BUTTON_HEIGHT}px;
  width: ${({width}) => (width ? `${width}px` : '100%')};
  border-radius: ${({borderRadius}) => borderRadius || '100'}px;
  justify-content: center;
  align-items: center;
`;

export const ChildContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Shadow = styled.View`
  position: absolute;
  top: 4px;
  height: ${({height}) => height || BUTTON_HEIGHT}px;
  width: ${({width}) => (width ? `${width}px` : '100%')};
  justify-content: center;
  align-items: center;
  border-radius: ${({borderRadius}) => borderRadius || '100'}px;
  background-color: ${({backgroundColor}) =>
    backgroundColor || COLORS.blueShadow};
`;
