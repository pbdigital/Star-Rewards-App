import React from 'react';
import {Text} from '..';
import {COLORS} from '../../Constants';
import {
  DotActive,
  RadioButtonRoot,
  DotInActive,
  InlineDotActive,
  InlineDotActivePoint,
  InlineDotInActive,
  InlineDotContainer,
} from './styles';

export const RADIO_BUTTON_TYPE = {
  Block: 1,
  Text: 2,
};

const RadioButton = ({
  type = RADIO_BUTTON_TYPE.Block,
  isSelected,
  label,
  onPress,
  contentContaierStyle = {},
}) => {
  if (type === RADIO_BUTTON_TYPE.Block) {
    return (
      <RadioButtonRoot onPress={onPress}>
        {isSelected ? <DotActive /> : <DotInActive />}
        <Text
          fontSize={16}
          fontWeight="400"
          textAlign="center"
          marginLeft={16}
          color={COLORS.Text.grey}>
          {label}
        </Text>
      </RadioButtonRoot>
    );
  }

  return (
    <InlineDotContainer onPress={onPress} style={contentContaierStyle}>
      {isSelected ? (
        <InlineDotActive>
          <InlineDotActivePoint />
        </InlineDotActive>
      ) : (
        <InlineDotInActive />
      )}
      <Text
        fontSize={18}
        fontWeight="400"
        textAlign="left"
        marginLeft={12}
        color={COLORS.Text.black}>
        {label}
      </Text>
    </InlineDotContainer>
  );
};

export {RadioButton};
