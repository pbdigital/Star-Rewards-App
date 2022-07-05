import React from 'react';
import {ActivityIndicator} from 'react-native';
import {COLORS} from 'Constants';
import {Container} from './styles';

const LoadingIndicator = ({backgroundColor}) => {
  return (
    <Container backgroundColor={backgroundColor}>
      <ActivityIndicator color={COLORS.Blue} />
    </Container>
  );
};

export {LoadingIndicator};
