/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text} from '../Text';
import {TextInput} from '../TextInput';
import {InputContainer} from './styles';

const AuthTextInput = ({label, marginTop, ...rest}) => {
  return (
    <InputContainer marginTop={marginTop}>
      <Text
        fontSize={18}
        fontWeight="500"
        lineHeight={27}
        textAlign="left"
        fontFamily="Poppins-Medium">
        {label}
      </Text>
      <TextInput
        containerStyle={{borderRadius: 16}}
        fontSize={16}
        marginTop={8}
        {...rest}
      />
    </InputContainer>
  );
};

export {AuthTextInput};
