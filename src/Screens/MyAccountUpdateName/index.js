import React, {useState} from 'react';
import {Alert, KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  Toolbar,
  AppTextInput,
  LoadingIndicator,
  AppAlertModal,
  Text,
  Image,
} from 'Components';
import {COLORS} from 'Constants';
import {userInforSelector, userActions} from 'Redux';
import {Images} from 'Assets/Images';
import {SuccessModalContaier, Root, Container, Content, Padded} from './styles';
import {useFormik} from 'formik';
import {firstNameRule} from 'Validations/FormValidation';
import * as Yup from 'yup';

const MyAccountUpdateNameScreen = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(userInforSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleOnPressSaveButton = async ({firstName}) => {
    setIsLoading(true);
    const res = await dispatch(
      userActions.updateUserInfo({
        firstName,
      }),
    );
    setIsLoading(false);
    if (res?.payload.success) {
      setShowSuccessAlert(true);
    } else {
      Alert.alert('Unable to update your information. Please try again later.');
    }
  };

  const {errors, handleChange, values, handleSubmit} = useFormik({
    initialValues: {
      firstName: userInfo?.firstName,
    },
    validationSchema: Yup.object().shape({
      firstName: firstNameRule,
    }),
    onSubmit: handleOnPressSaveButton,
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.flex1}>
      <Root>
        <Container>
          <Padded>
            <Toolbar title="Update Name" />
          </Padded>
          <Content>
            <AppTextInput
              label="Name"
              onChangeText={handleChange('firstName')}
              value={values.firstName}
              errorMessage={errors.firstName}
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
            Your name was successfully updated.
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
});

export {MyAccountUpdateNameScreen};
