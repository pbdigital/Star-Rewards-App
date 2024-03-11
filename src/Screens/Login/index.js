/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect} from 'react';
import {
  Alert,
  View,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Platform,
} from 'react-native';
import {useFormik} from 'formik';
import {
  Button,
  ScreenBackground,
  Text,
  AuthLogo,
  AuthTextInput,
} from 'Components';
import {COLORS, NAV_ROUTES} from 'Constants';
import {LoginSchema} from 'Validations/FormValidation';
import {useDispatch, useSelector} from 'react-redux';
import {Images} from 'Assets/Images';
import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {
  isAuthUserLoadingSelector,
  userInforSelector,
  childActions,
  userActions,
} from 'Redux';
import {
  appleAuth,
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import {doHapticFeedback} from 'Helpers';
import {API} from 'Services/api';
import jwt_decode from 'jwt-decode';
import {FormContainer, Content, FooterContainer} from './styles';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoading = useSelector(isAuthUserLoadingSelector);
  const user = useSelector(userInforSelector);
  const isFocused = useIsFocused();

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
    await dispatch(childActions.setAddChildFlowIsEditig(false));
    await dispatch(userActions.setIsLoading(false));
    if (children && children?.length > 0) {
      resetToNavigation(NAV_ROUTES.loginUserType);
    } else {
      resetToNavigation(NAV_ROUTES.newChildSetupStackNavigator);
    }
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
    dispatch(userActions.setIsLoading(true));
    const {payload} = await dispatch(userActions.login(formData));
    handleLoginResponse(payload);
  };

  const handleLoginResponse = ({token, message, errors}) => {
    if (token) {
    } else if (!token && message) {
      Alert.alert(message);
    } else if (errors?.username_password_incorrect?.length > 0) {
      Alert.alert(errors?.username_password_incorrect[0]);
    } else {
      Alert.alert('Signin failed, please try again later.');
      resetForm();
    }
    dispatch(userActions.setIsLoading(false));
  };

  const {errors, handleChange, handleSubmit, values, resetForm} = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: handleOnFormSubmit,
    validateOnChange: false,
  });

  const handleOnPressForgotPassword = () => {
    const url = 'https://starrewardsapp.com/forgot-password';

    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const onAppleButtonPress = async () => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    const {email} = jwt_decode(appleAuthRequestResponse?.identityToken);
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      dispatch(userActions.setIsLoading(true));
      const {
        authorizationCode,
        authorizedScopes,
        fullName,
        identityToken,
        nonce,
        realUserStatus,
        state,
        user,
      } = appleAuthRequestResponse;
      const params = {
        authorization: {
          state,
          code: authorizationCode,
          id_token: identityToken,
        },
        user: {
          email,
          name: {
            firstName: fullName.givenName,
            lastName: fullName.familyName,
          },
        },
      };
      const {payload} = await dispatch(userActions.loginApple(params));
      handleLoginResponse(payload);
    }
  };

  return (
    <ScreenBackground cloudType={0}>
      <Content>
        <View>
          <AuthLogo title="Login" />
          <FormContainer>
            <AuthTextInput
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              inputMode="email"
              autoCapitalize="none"
              errorMessage={errors.email}
              leftImage={Images.IcUpdate}
            />
            <AuthTextInput
              label="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              errorMessage={errors.password}
              secureTextEntry={true}
              leftImage={Images.IcLock}
              marginTop={20}
            />
            <TouchableOpacity onPress={handleOnPressForgotPassword}>
              <Text
                fontSize={14}
                fontWeight="400"
                lineHeight={28}
                textAlign="left"
                marginTop={24}
                color={COLORS.Text.grey}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
            <Button
              borderRadius={16}
              titleColor={COLORS.White}
              buttonColor={COLORS.Green}
              shadowColor={COLORS.GreenShadow}
              onPress={handleSubmit}
              title="Login"
              buttonTitleFontSize={16}
              height={60}
              disabled={isLoading}
              isLoading={isLoading}
              marginTop={26}
            />
          </FormContainer>
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
                buttonType={AppleButton.Type.SIGN_IN}
                style={styles.appleButton}
                onPress={onAppleButtonPress}
              />
            </>
          )}
        </View>
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
              color={COLORS.GreenShadow}>
              {' '}
              Sign-up
            </Text>
          </TouchableOpacity>
        </FooterContainer>
      </Content>
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

export {LoginScreen};
