import React from 'react';
import {Text} from '..';
import {COLORS} from '../../Constants';
import {DotActive, RadioButtonRoot, DotInActive} from './styles';

const RadioButton = ({isSelected, label, onPress}) => {
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
};

export {RadioButton};
