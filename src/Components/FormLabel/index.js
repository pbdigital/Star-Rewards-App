import React from 'react';
import {COLORS} from 'Constants';
import {Text} from '../Text';

const FormLabel = ({value, style}) => {
  return (
    <Text
      style={style || {}}
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
