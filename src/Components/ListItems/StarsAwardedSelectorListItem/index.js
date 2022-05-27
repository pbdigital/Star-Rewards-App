import React from 'react';
import {COLORS} from '../../../Constants/Colors';
import {Text} from '../../Text';
import {Item} from './styles';

const StarsAwardedSelectorListItem = ({value, index, onPress, isSelected}) => {
  const textColor = isSelected ? COLORS.LightBlue : COLORS.Text.grey;

  return (
    <Item
      key={`${value}-${index}-stars-awarded`}
      isSelected={isSelected}
      onPress={() => onPress(value)}>
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