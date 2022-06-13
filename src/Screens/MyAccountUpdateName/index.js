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
import {Images} from '../../Assets/Images';
import {Image} from './../../Components/Image';
import {SuccessModalContaier, Root, Container, Content, Padded} from './styles';

const MyAccountUpdateNameScreen = () => {
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
            <Toolbar title="Update Name" />
          </Padded>
          <Content>
            <AppTextInput
              label="Name"
              onChangeText={() => {}}
              // errorMessage={childNameInputError}
              value={userInfo?.firstName}
              // style={styles.textInput}
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

export {MyAccountUpdateNameScreen};
