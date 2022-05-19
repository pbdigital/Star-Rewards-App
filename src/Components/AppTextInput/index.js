import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {COLORS} from '../../Constants/Colors';
import {FormLabel} from '../FormLabel';
import {Root, InputContainer} from './styles';

const AppTextInput = ({label, marginBottom, ...props}) => {
  return (
    <Root marginBottom={marginBottom}>
      <FormLabel value={label} />
      <InputContainer>
        <TextInput style={styles.textInput} {...props} />
      </InputContainer>
    </Root>
  );
};

const styles = StyleSheet.create({
  textInput: {
    color: COLORS.Text.grey,
  },
});

export {AppTextInput};
