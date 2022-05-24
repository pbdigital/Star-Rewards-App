import React from 'react';
import {COLORS} from '../../Constants/Colors';
import {Text} from '../Text';

const FormLabel = ({value}) => {
  return (
    <Text
      fontSize={18}
      fontWeight="500"
      lineHeight={27}
      marginBottom={8}
      color={COLORS.Text.black}>
      {value}
    </Text>
  );
};

export {FormLabel};