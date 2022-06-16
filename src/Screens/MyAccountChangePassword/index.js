import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  Button,
  Toolbar,
  AppTextInput,
  LoadingIndicator,
  Text,
  AppAlertModal,
} from '../../Components';
import {COLORS} from '../../Constants/Colors';
import {Root, Container, Content, Padded, SuccessModalContaier} from './styles';
import {Images} from '../../Assets/Images';
import {Image} from './../../Components/Image';
import {useFormik} from 'formik';
import {UpdatePasswordScheme} from '../../Validations/FormValidation';
import {userActions} from '../../Redux/User/UserSlice';
import {Alert} from 'react-native';

const MyAccountChangePasswordScreen = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleOnPressSaveButton = async ({password}) => {
    setIsLoading(true);
    const res = await dispatch(
      userActions.updateUserInfo({
        password,
      }),
    );
    setIsLoading(false);
    if (res?.payload.success) {
      setShowSuccessAlert(true);
    } else {
      Alert.alert('Unable to update your information. Please try again later.');
    }
  };

  const {errors, handleChange, handleSubmit, values, setErrors} = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: UpdatePasswordScheme,
    onSubmit: handleOnPressSaveButton,
    validateOnChange: false,
  });

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
              onChangeText={handleChange('password')}
              value={values.password}
              errorMessage={errors.password}
              marginBottom={31}
              secureTextEntry
            />
            <AppTextInput
              secureTextEntry
              label="Confirm Password"
              onChangeText={handleChange('confirmPassword')}
              value={values.confirmPassword}
              errorMessage={errors.confirmPassword}
              marginBottom={31}
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
      {isLoading && <LoadingIndicator />}
    </>
  );
};

export {MyAccountChangePasswordScreen};
