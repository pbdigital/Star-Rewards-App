import React from 'react';
import {BackButton} from './BackButton';
import {ToolBarContainer, TitleContainer} from './styles';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../Constants/colors';
import {Text} from '../Text';

const Toolbar = ({onPressBackButton, title}) => {
  const navigation = useNavigation();
  const handleOnPressBackButton = () => {
    if (onPressBackButton) {
      onPressBackButton();
    } else if (navigation.canGoBack) {
      navigation.goBack();
    }
  };

  return (
    <ToolBarContainer>
      <BackButton onPress={handleOnPressBackButton} />
      <TitleContainer>
        <Text
          style={{width: 230}}
          numberOfLines={1}
          fontSize={24}
          fontWeight="600"
          lineHeight={36}
          textAlign="center"
          color={COLORS.white}>
          {title}
        </Text>
      </TitleContainer>
    </ToolBarContainer>
  );
};

export {Toolbar};
