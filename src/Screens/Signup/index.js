/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Alert,
  View,
  StyleSheet,
  Platform,
} from 'react-native';
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
import {userActions, userInforSelector, childActions} from 'AppReduxState';
import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {NAV_ROUTES} from 'Constants';
import {doHapticFeedback, generateAppleAuthParams} from 'Helpers';
import {API} from 'Services/api';
import {Images} from 'src/Assets/Images';
import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import {Content, FooterContainer, FormContainer, Root} from './styles';

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

  const onAppleButtonPress = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );
    if (credentialState === appleAuth.State.AUTHORIZED) {
      dispatch(userActions.setIsLoading(true));
      const params = generateAppleAuthParams(appleAuthRequestResponse);
      const {payload} = await dispatch(userActions.signUpApple(params));
      const {message} = payload;
      if (errors || message) {
        let alertMessage = message
          ? message
          : 'Unable to create a new account. Please try again later';
        Alert.alert(alertMessage);
      }
      await dispatch(userActions.setIsLoading(false));
      setIsLoading(false);
    }
  };

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
      <Root>
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
              autoCapitalize="none"
              inputMode="text"
              autoComplete="name"
            />
            <AuthTextInput
              label="Email"
              leftImage={Images.IcLock}
              marginTop={20}
              value={values.email}
              onChangeText={handleChange('email')}
              errorMessage={errors.email}
              inputMode="email"
              autoComplete="email"
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
            {Platform.OS === 'ios' && (
              <>
                <View style={styles.dividerContainer}>
                  <View style={styles.divider} />
                  <Text marginLeft={8} marginRight={8} color={COLORS.Grey}>
                    or
                  </Text>
                  <View style={styles.divider} />
                </View>
                <AppleButton
                  buttonStyle={AppleButton.Style.WHITE}
                  buttonType={AppleButton.Type.SIGN_UP}
                  style={styles.appleButton}
                  onPress={onAppleButtonPress}
                />
              </>
            )}
          </FormContainer>
          {renderFooter()}
        </Content>
      </Root>
    </ScreenBackground>
  );
};

const styles = StyleSheet.create({
  appleButton: {
    width: '100%',
    height: 45,
  },
  divider: {
    flex: 1,
    backgroundColor: COLORS.Grey,
    height: 1,
    width: '100%',
  },
  dividerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
});

export {SignupScreen};
