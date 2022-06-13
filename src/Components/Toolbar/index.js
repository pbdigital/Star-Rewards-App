import React from 'react';
import {StyleSheet} from 'react-native';
import {BackButton} from './BackButton';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../Constants/Colors';
import {Text} from '../Text';
import {ToolBarContainer, TitleContainer, RightIconButton} from './styles';

const Toolbar = ({
  onPressBackButton,
  title,
  iconRight,
  onPressRightIconButton,
}) => {
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
          style={styles.toolbarTitle}
          numberOfLines={1}
          fontSize={24}
          fontWeight="600"
          lineHeight={36}
          textAlign="center"
          color={COLORS.white}>
          {title}
        </Text>
      </TitleContainer>
      <RightIconButton onPress={onPressRightIconButton}>
        {iconRight && iconRight}
      </RightIconButton>
    </ToolBarContainer>
  );
};

const styles = StyleSheet.create({
  toolbarTitle: {width: 230},
});

export {Toolbar};
