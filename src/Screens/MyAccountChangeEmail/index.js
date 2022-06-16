import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, Platform} from 'react-native';
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
import {userInforSelector} from '../../Redux/User/UserSelectors';
import {Image} from './../../Components/Image';
import {Root, Container, Content, Padded, SuccessModalContaier} from './styles';
import {Images} from '../../Assets/Images';
import {useFormik} from 'formik';
import {UpdateEmailScheme} from '../../Validations/FormValidation';
import {userActions} from '../../Redux/User/UserSlice';

const MyAccountChangeEmailScreen = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(userInforSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleOnPressSaveButton = async ({newEmail}) => {
    setIsLoading(true);
    const res = await dispatch(
      userActions.updateUserInfo({
        email: newEmail,
      }),
    );
    setIsLoading(false);
    if (res?.payload.success) {
      setShowSuccessAlert(true);
    } else {
      Alert.alert('Unable to update your information. Please try again later.');
    }
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
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
              marginTop={16}
            />
          </Padded>
        </Container>
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
      {isLoading && <LoadingIndicator />}
    </KeyboardAvoidingView>
  );
};

export {MyAccountChangeEmailScreen};
