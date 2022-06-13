import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  Toolbar,
  AppTextInput,
  LoadingIndicator,
  AppAlertModal,
  Text,
} from '../../Components';
import {COLORS} from '../../Constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {userInforSelector} from '../../Redux/User/UserSelectors';
import {Image} from './../../Components/Image';
import {Root, Container, Content, Padded, SuccessModalContaier} from './styles';
import {Images} from '../../Assets/Images';

const MyAccountChangeEmailScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userInfo = useSelector(userInforSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleOnPressSaveButton = () => {
    setShowSuccessAlert(true);
  };

  return (
    <>
      <Root>
        <Container>
          <Padded>
            <Toolbar title="Change Email Name" />
          </Padded>
          <Content>
            <AppTextInput
              label="Email"
              onChangeText={() => {}}
              value={userInfo?.email}
              marginBottom={31}
            />
            <AppTextInput
              label="New Email"
              onChangeText={() => {}}
              marginBottom={31}
            />
            <AppTextInput
              label="Confirm New Email"
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
            Your email was successfully updated.
          </Text>
        </SuccessModalContaier>
      </AppAlertModal>
    </>
  );
};

export {MyAccountChangeEmailScreen};
