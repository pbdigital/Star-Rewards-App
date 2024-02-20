import React from 'react';
import {ProfileChildSelector} from '../ProfileChildSelector';
import {StartPointDisplay} from '../StarPointDisplay';
import {BackButton} from '../Toolbar/BackButton';
import {Container, ToolbarControls} from './styles';
import {Text} from '../Text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const RewardsToolbar = ({
  hideAvatar,
  title,
  showBorderBottom,
  rightControlButton,
  onPressSelectChild,
  hideStarPointDisplay,
  centerTitle,
  hideBackButton = false,
  onBackButtonPress,
}) => {
  const {top} = useSafeAreaInsets();
  return (
    <Container showBorderBottom={showBorderBottom} marginTop={top > 0 ? 0 : 16}>
      {hideAvatar ? (
        <ToolbarControls>
          {!hideBackButton && <BackButton onPress={onBackButtonPress} />}
          <Text
            marginLeft={hideBackButton ? 0 : 34}
            fontSize={24}
            fontWeight="600"
            lineHeight={36}
            textAlign="center"
            style={centerTitle ? {flex: 1, paddingRight: 40} : {}}>
            {title}
          </Text>
        </ToolbarControls>
      ) : (
        <ProfileChildSelector
          contentContainerStyle={{flex: 1}}
          onPressSelectChild={onPressSelectChild}
        />
      )}
      {!hideStarPointDisplay && <StartPointDisplay marginRight={34} />}
      {rightControlButton && rightControlButton}
    </Container>
  );
};

export {RewardsToolbar};
