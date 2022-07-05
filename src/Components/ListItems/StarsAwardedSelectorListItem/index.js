import React from 'react';
import {COLORS} from 'Constants';
import {Text} from '../../Text';
import {doHapticFeedback} from 'Helpers';
import {Item} from './styles';

const StarsAwardedSelectorListItem = ({value, index, onPress, isSelected}) => {
  const textColor = isSelected ? COLORS.LightBlue : COLORS.Text.grey;
  const handleOnItemPress = () => {
    doHapticFeedback();
    onPress(value);
  };

  return (
    <Item
      key={`${value}-${index}-stars-awarded`}
      isSelected={isSelected}
      onPress={handleOnItemPress}>
      <Text
        fontWeight="400"
        fontSize={18}
        lineHeight={24}
        textAlign="center"
        color={textColor}>
        {value}
      </Text>
    </Item>
  );
};

export {StarsAwardedSelectorListItem};
