import React, {useState} from 'react';
import {
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  Button,
  Toolbar,
  AppTextInput,
  LoadingIndicator,
  Text,
  AppAlertModal,
  Image,
} from 'Components';
import {COLORS} from 'Constants';
import {Root, Container, Content, Padded, SuccessModalContaier} from './styles';
import {Images} from 'Assets/Images';
import {useFormik} from 'formik';
import {UpdatePasswordScheme} from 'Validations/FormValidation';
import {userActions} from 'AppReduxState';

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

  const {errors, handleChange, handleSubmit, values, dirty, setErrors} =
    useFormik({
      initialValues: {
        password: '',
        confirmPassword: '',
      },
      validationSchema: UpdatePasswordScheme,
      onSubmit: handleOnPressSaveButton,
      validateOnChange: false,
    });

  const clearError = () => setErrors({});

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex1}>
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
              Your new password must be different from your previous used
              passwords.
            </Text>
            <AppTextInput
              label="Password"
              onChangeText={handleChange('password')}
              value={values.password}
              marginBottom={7}
              secureTextEntry
              onChange={clearError}
            />
            <Text
              fontSize={14}
              lineHeight={32}
              fontWeight="400"
              textAlign="left"
              marginBottom={30}
              color={errors.password ? COLORS.Red : COLORS.Text.grey}>
              Must be atleast 6 characters
            </Text>
            <View style={styles.confirmPasswordInputWrapper}>
              <AppTextInput
                secureTextEntry
                label="Confirm Password"
                onChangeText={handleChange('confirmPassword')}
                onChange={clearError}
                value={values.confirmPassword}
              />
              {values.password === values.confirmPassword && dirty && (
                <Image
                  source={Images.IcCheck}
                  width={16}
                  height={11}
                  style={styles.confirmPasswordCheckImage}
                />
              )}
            </View>
            <Text
              fontSize={14}
              lineHeight={32}
              fontWeight="400"
              textAlign="left"
              marginBottom={30}
              marginTop={7}
              color={errors.confirmPassword ? COLORS.Red : COLORS.Text.grey}>
              Both password must match
            </Text>
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
            fontFamily="Poppins-SemiBold"
            textAlign="center"
            marginTop={20}
            color={COLORS.Text.black}>
            Your password was successfully updated.
          </Text>
        </SuccessModalContaier>
      </AppAlertModal>
      {isLoading && <LoadingIndicator />}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  confirmPasswordInputWrapper: {
    width: '100%',
  },
  confirmPasswordCheckImage: {
    position: 'absolute',
    bottom: 18,
    right: 20,
  },
});

export {MyAccountChangePasswordScreen};
