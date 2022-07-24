import { COLORS } from 'Constants';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from '../Text';
import {Container, Col} from './styles';

const FormFooter = ({submitButton, contentContainerStyle}) => {
  return (
    <Container style={contentContainerStyle}>
      <Col>
        <TouchableOpacity>
          <Text
            fontSize={14}
            fontWeight="400"
            lineHeight={28}
            textAlign="left"
            color={COLORS.Text.grey}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </Col>
      {submitButton && <Col>{submitButton}</Col>}
    </Container>
  );
};

export {FormFooter};
