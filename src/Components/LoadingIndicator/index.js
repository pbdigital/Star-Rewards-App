import React from 'react';
import {ActivityIndicator} from 'react-native';
import {COLORS} from '../../Constants/Colors';
import {Container} from './styles';

const LoadingIndicator = () => {
  return (
    <Container>
      <ActivityIndicator color={COLORS.Blue} />
    </Container>
  );
};

export {LoadingIndicator};
