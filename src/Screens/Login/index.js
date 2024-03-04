/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect} from 'react';
import {Alert, View, TouchableOpacity, Linking} from 'react-native';
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
import {doHapticFeedback} from 'Helpers';
import {API} from 'Services/api';
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
    if (children && children?.length > 0) {
      resetToNavigation(NAV_ROUTES.loginUserType);
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
    dispatch(userActions.setIsLoading(true));
    const {
      payload: {token, message, errors},
    } = await dispatch(userActions.login(formData));
    if (token) {
    } else if (!token && message) {
      Alert.alert(message);
    } else if (errors?.username_password_incorrect?.length > 0) {
      Alert.alert(errors?.username_password_incorrect[0]);
    } else {
      Alert.alert('Signup failed, please try again later.');
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

export {LoginScreen};
