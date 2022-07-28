import {useNavigation} from '@react-navigation/native';
import {COLORS, NAV_ROUTES} from 'Constants';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from '../Text';
import {Container, Col} from './styles';

const FormFooter = ({submitButton, contentContainerStyle}) => {
  const navigation = useNavigation();

  const handleOnPressForgotPassword = () => {
    navigation.navigate(NAV_ROUTES.resetPassword);
  };

  return (
    <Container style={contentContainerStyle}>
      <Col>
        <TouchableOpacity onPress={handleOnPressForgotPassword}>
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
