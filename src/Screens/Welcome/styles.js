import styled from 'styled-components/native';
import {COLORS} from 'Constants';
import {Dimensions, StyleSheet} from 'react-native';

export const Button = styled.TouchableOpacity`
  padding-vertical: 15px;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
  margin-top: 31px;
  margin-bottom: 15px;
  padding-horizontal: 20px;
  border-color: ${COLORS.Background.border};
`;

export const FooterContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const Root = styled.View`
  flex: 1;
  background-color: ${COLORS.Background.screen};
`;

export const WelcomeNoteContainer = styled.View`
  margin-top: 51px;
`;

export const StarLogoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 37px;
  margin-top: 43px;
`;

export const AnimationContainer = styled.View`
  flex: 1;
`;

export const AnimationWrapper = styled.View`
  width: 100%;
  height: 300px;
  position: relative;
`;

export const Monster1 = styled.View`
  width: 300px;
  height: 300px;
  position: absolute;
  bottom: 0px;
  left: -60px;
`;

export const Monster2 = styled.View`
  width: 260px;
  height: 260px;
  position: absolute;
  bottom: 6px;
  right: -10px;
`;

export const Monster3 = styled.View`
  width: 200px;
  height: 200px;
  position: absolute;
  bottom: -16px;
  left: ${(Dimensions.get('window').width / 2) - 110}px;
`;

export const styles = StyleSheet.create({
  bottomLeftCloud: {
    position: 'absolute',
    bottom: -50,
    left: -12,
  },
  upperRightCloud: {
    position: 'absolute',
    top: -50,
    right: -10,
  },
  animationBackdrop: {
    backgroundColor: COLORS.LightBlue,
    position: 'absolute',
    flex: 1,
    height: Dimensions.get('window').height * 0.31,
    width: '100%',
    bottom: 0,
  },
  monster1: {
    width: 300,
    height: 300,
  },
  monster2: {
    width: 260,
    height: 260,
  },
  monster3: {
    width: 200,
    height: 200,
  },
});
