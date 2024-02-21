import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useFormik} from 'formik';
import {
  AuthLogo,
  AuthTextInput,
  Button,
  FormFooter,
  ScreenBackground,
  Text,
} from 'Components';
import {COLORS} from 'Constants';
import {SignUpSchema} from 'Validations/FormValidation';
import {useDispatch, useSelector} from 'react-redux';
import {userActions, userInforSelector, childActions} from 'Redux';
import {useNavigation} from '@react-navigation/native';
import {NAV_ROUTES} from 'Constants';
import {doHapticFeedback} from 'Helpers';
import {API} from 'Services/api';
import {Images} from 'src/Assets/Images';
import {
  Content,
  FooterContainer,
  FormContainer,
  ScrollContainer,
} from './styles';

const ResetPasswordScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(userInforSelector);

  const getAllChildren = useCallback(async () => {
    const {payload} = await dispatch(childActions.getAllChildren());
    const {children} = payload || {};
    if (children && children?.length > 0) {
      navigation.navigate(NAV_ROUTES.rewardsStackNavigator);
    } else {
      navigation.navigate(NAV_ROUTES.newChildSetupStackNavigator);
    }
    await dispatch(userActions.setIsLoading(false));
  }, [dispatch, navigation]);

  useEffect(() => {
    setTimeout(() => {
      if (user?.token) {
        API.setHeader('Authorization', `Bearer ${user?.token}`);
        getAllChildren();
      } else {
        navigation.navigate(NAV_ROUTES.authNavigationStack);
      }
    }, 500);
  }, [user, getAllChildren, navigation]);

  const handleOnFormSubmit = async formData => {
    setIsLoading(true);
    // const {payload} = await dispatch(userActions.signUp(formData));
    // const {token, message} = payload || {};
    // if (!token) {
    //   const alertMessage = message
    //     ? message
    //     : 'Unable to create a new account. Please try again later';
    //   Alert.alert(alertMessage);
    // }
    setIsLoading(false);
  };

  const {errors, handleChange, handleSubmit, values} = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: SignUpSchema, // Change this schema
    onSubmit: handleOnFormSubmit,
    validateOnChange: false,
  });

  const renderFooter = () => (
    <FooterContainer>
      <Text
        fontSize={14}
        fontWeight="400"
        lineHeight={28}
        textAlign="left"
        color={COLORS.Text.grey}>
        Don't have an account?
      </Text>
      <TouchableOpacity
        onPress={() => {
          doHapticFeedback();
          navigation.navigate(NAV_ROUTES.signup);
        }}>
        <Text
          fontSize={14}
          fontWeight="600"
          lineHeight={28}
          textAlign="left"
          marginTop={3}
          color={COLORS.GreenShadow}>
          {' '}
          Sign-up
        </Text>
      </TouchableOpacity>
    </FooterContainer>
  );

  return (
    <ScreenBackground cloudType={0}>
      <ScrollContainer>
        <Content>
          <AuthLogo title="Reset Password" />
          <FormContainer>
            <AuthTextInput
              label="Old Password"
              leftImage={Images.IcLock}
              value={values.oldPassword}
              onChangeText={handleChange('oldPassword')}
              errorMessage={errors.oldPassword}
              secureTextEntry={true}
              marginTop={20}
            />
            <AuthTextInput
              label="new Password"
              leftImage={Images.IcLock}
              value={values.newPassword}
              onChangeText={handleChange('newPassword')}
              errorMessage={errors.newPassword}
              secureTextEntry={true}
              marginTop={20}
            />
            <AuthTextInput
              label="Confirm Password"
              leftImage={Images.IcLock}
              marginTop={20}
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              errorMessage={errors.confirmPassword}
              secureTextEntry={true}
            />
            <FormFooter
              // eslint-disable-next-line react-native/no-inline-styles
              contentContainerStyle={{marginTop: 23}}
              submitButton={
                <Button
                  borderRadius={16}
                  titleColor={COLORS.White}
                  buttonColor={COLORS.Green}
                  shadowColor={COLORS.GreenShadow}
                  onPress={handleSubmit}
                  title="Reset"
                  buttonTitleFontSize={16}
                  width={117}
                  height={40}
                  disabled={isLoading}
                  isLoading={isLoading}
                />
              }
            />
          </FormContainer>
          {renderFooter()}
        </Content>
      </ScrollContainer>
    </ScreenBackground>
  );
};

export {ResetPasswordScreen};
