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
import {useFormik} from 'formik';
import {UpdateEmailScheme} from '../../Validations/FormValidation';

const MyAccountChangeEmailScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userInfo = useSelector(userInforSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleOnPressSaveButton = formInput => {
    console.log({formInput});
    setShowSuccessAlert(true);
  };

  const {errors, values, handleSubmit, handleChange} = useFormik({
    initialValues: {
      email: userInfo?.email,
      newEmail: '',
      confirmEmail: '',
    },
    validationSchema: UpdateEmailScheme,
    validateOnChange: false,
    onSubmit: handleOnPressSaveButton,
  });

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
              onChangeText={handleChange('email')}
              value={values.email}
              errorMessage={errors.email}
              marginBottom={31}
            />
            <AppTextInput
              label="New Email"
              onChangeText={handleChange('newEmail')}
              value={values.newEmail}
              errorMessage={errors.newEmail}
              marginBottom={31}
            />
            <AppTextInput
              label="Confirm New Email"
              onChangeText={handleChange('confirmEmail')}
              value={values.confirmEmail}
              errorMessage={errors.confirmEmail}
            />
          </Content>
          <Padded>
            <Button
              borderRadius={16}
              titleColor={COLORS.White}
              buttonColor={COLORS.Green}
              shadowColor={COLORS.GreenShadow}
              onPress={handleSubmit}
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
