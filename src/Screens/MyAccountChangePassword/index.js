import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  Toolbar,
  AppTextInput,
  LoadingIndicator,
  Text,
  AppAlertModal,
} from '../../Components';
import {COLORS} from '../../Constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {userInforSelector} from '../../Redux/User/UserSelectors';
import {Root, Container, Content, Padded, SuccessModalContaier} from './styles';
import { Images } from '../../Assets/Images';
import { Image } from 'react-native';

const MyAccountChangePasswordScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userInfo = useSelector(userInforSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(true);

  const handleOnPressSaveButton = () => {
    return;
  };

  return (
    <>
      <Root>
        <Container>
          <Padded>
            <Toolbar title="Change Password" />
          </Padded>
          <Content>
            <Text
              fontSize={18}
              lineHeight={32}
              fontWeight="400"
              textAlign="left"
              marginBottom={30}
              color={COLORS.Text.grey}>
              Your new password must be different from your previous used passwords.
            </Text>
            <AppTextInput
              label="Password"
              onChangeText={() => {}}
              marginBottom={31}
            />
            <AppTextInput
              label="Confirm Password"
              onChangeText={() => {}}
              marginBottom={31}
            />
          </Content>
          <Padded>
            <Button
              borderRadius={16}
              titleColor={COLORS.White}
              buttonColor={COLORS.Green}
              shadowColor={COLORS.GreenShadow}
              onPress={handleOnPressSaveButton}
              title="Save"
              buttonTitleFontSize={16}
              disabled={isLoading}
              isLoading={isLoading}
            />
          </Padded>
        </Container>
        {isLoading && <LoadingIndicator />}
      </Root>
      <AppAlertModal
        isVisible={showSuccessAlert}
        onClose={() => setShowSuccessAlert(false)}>
        <SuccessModalContaier>
          <Image source={Images.IcSuccess} width={60} height={60} />
          <Text
            fontSize={20}
            lineHeight={30}
            fontWeight="600"
            textAlign="center"
            marginTop={20}
            color={COLORS.Text.black}>
            Your password was successfully updated.
          </Text>
        </SuccessModalContaier>
      </AppAlertModal>
    </>
  );
};

export {MyAccountChangePasswordScreen};
