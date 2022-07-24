import React from 'react';
import {Images} from 'Assets/Images';
import {Image} from '../Image';
import {Text} from '../Text';
import {Container} from './styles';

const AuthLogo = () => {
  return (
    <Container>
      <Image source={Images.AuthLogo} width={100} height={100} />
      <Text
        fontSize={24}
        fontWeight="600"
        lineHeight={36}
        textAlign="center"
        marginTop={5}>
        Login Screen
      </Text>
    </Container>
  );
};

export {AuthLogo};
