import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {COLORS} from '../../Constants/Colors';
import {FormLabel} from '../FormLabel';
import { Text } from '../Text';
import {Root, InputContainer} from './styles';

const AppTextInput = ({label, marginBottom, errorMessage, ...props}) => {
  return (
    <Root marginBottom={marginBottom}>
      <FormLabel value={label} />
      <InputContainer>
        <TextInput style={styles.textInput} {...props} />
      </InputContainer>
      {errorMessage && (
        <Text fontSize={14} marginTop={4} marginLeft={8} color={COLORS.Red}>
          {errorMessage}
        </Text>
      )}
    </Root>
  );
};

const styles = StyleSheet.create({
  textInput: {
    color: COLORS.Text.grey,
  },
});

export {AppTextInput};
