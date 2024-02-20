import React, {useCallback, useEffect, useState} from 'react';
import {TouchableOpacity, Alert, ScrollView} from 'react-native';
import {useFormik} from 'formik';
import {
  AuthLogo,
  AuthTextInput,
  Button,
  ScreenBackground,
  Text,
} from 'Components';
import {COLORS} from 'Constants';
import {SignUpSchema} from 'Validations/FormValidation';
import {useDispatch, useSelector} from 'react-redux';
import {userActions, userInforSelector, childActions} from 'Redux';
import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {NAV_ROUTES} from 'Constants';
import {doHapticFeedback} from 'Helpers';
import {API} from 'Services/api';
import {Images} from 'src/Assets/Images';
import {Content, FooterContainer, FormContainer} from './styles';

const SignupScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(userInforSelector);

  const resetToNavigation = routeName => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: routeName,
          },
        ],
      }),
    );
  };

  const getAllChildren = useCallback(async () => {
    const {payload} = await dispatch(childActions.getAllChildren());
    const {children} = payload || {};
    if (children && children?.length > 0) {
      resetToNavigation(NAV_ROUTES.bottomTabNavigator);
    } else {
      resetToNavigation(NAV_ROUTES.newChildSetupStackNavigator);
    }
    await dispatch(userActions.setIsLoading(false));
  }, [dispatch, navigation]);

  useEffect(() => {
    if (!isFocused) {
      return;
    }
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
    const {payload} = await dispatch(userActions.signUp(formData));
    const {token, message} = payload || {};
    if (!token) {
      const alertMessage = message
        ? message
        : 'Unable to create a new account. Please try again later';
      Alert.alert(alertMessage);
    }
    setIsLoading(false);
  };

  const {errors, handleChange, handleSubmit, values} = useFormik({
    initialValues: {
      firstName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignUpSchema,
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
        Already have an account?
      </Text>
      <TouchableOpacity
        onPress={() => {
          doHapticFeedback();
          navigation.navigate(NAV_ROUTES.login);
        }}>
        <Text
          fontSize={14}
          fontWeight="600"
          lineHeight={28}
          textAlign="left"
          color={COLORS.GreenShadow}>
          {' '}
          Sign-in
        </Text>
      </TouchableOpacity>
    </FooterContainer>
  );

  return (
    <ScreenBackground cloudType={0}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <Content>
          <AuthLogo title="Create Parent Account" />
          <FormContainer>
            <AuthTextInput
              label="First Name"
              marginTop={20}
              value={values.firstName}
              onChangeText={handleChange('firstName')}
              errorMessage={errors.firstName}
              leftImage={Images.IcUpdate}
              inputMode="email"
              autoCapitalize="none"
            />
            <AuthTextInput
              label="Email"
              leftImage={Images.IcLock}
              marginTop={20}
              value={values.email}
              onChangeText={handleChange('email')}
              errorMessage={errors.email}
            />
            <AuthTextInput
              label="Password"
              leftImage={Images.IcLock}
              value={values.password}
              onChangeText={handleChange('password')}
              errorMessage={errors.password}
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
            <Button
              borderRadius={16}
              titleColor={COLORS.White}
              buttonColor={COLORS.Green}
              shadowColor={COLORS.GreenShadow}
              onPress={handleSubmit}
              title="Sign Up"
              buttonTitleFontSize={16}
              height={60}
              disabled={isLoading}
              isLoading={isLoading}
              marginTop={24}
            />
          </FormContainer>
          {renderFooter()}
        </Content>
      </ScrollView>
    </ScreenBackground>
  );
};

export {SignupScreen};
