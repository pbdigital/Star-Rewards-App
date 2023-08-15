import React, {forwardRef} from 'react';
import {TextInput, StyleSheet} from 'react-native';
import {FormLabel} from '../FormLabel';
import {COLORS} from 'Constants';
import {Text} from '../Text';
import {Root, InputContainer} from './styles';

const AppTextInput = forwardRef(
  (
    {label, marginBottom, errorMessage, contentContainerStyle, ...props},
    ref,
  ) => {
    return (
      <Root marginBottom={marginBottom} style={contentContainerStyle || {}}>
        <FormLabel value={label} />
        <InputContainer>
          <TextInput ref={ref} style={styles.textInput} {...props} />
        </InputContainer>
        {errorMessage && (
          <Text fontSize={14} marginTop={4} marginLeft={8} color={COLORS.Red}>
            {errorMessage}
          </Text>
        )}
      </Root>
    );
  },
);

const styles = StyleSheet.create({
  textInput: {
    color: COLORS.Text.grey,
  },
});

export {AppTextInput};
