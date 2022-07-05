import React, {useCallback, useEffect} from 'react';
import {Alert, View, TouchableOpacity} from 'react-native';
import {useFormik} from 'formik';
import {Button, ScreenBackground, Text, TextInput} from 'Components';
import {COLORS} from 'Constants';
import {LoginSchema} from 'Validations/FormValidation';
import {useDispatch, useSelector} from 'react-redux';
import {NAV_ROUTES} from 'Constants';
import {useNavigation} from '@react-navigation/native';
import {
  isAuthUserLoadingSelector,
  userInforSelector,
  childActions,
  userActions,
} from 'Redux';
import {doHapticFeedback} from 'Helpers';
import {API} from 'Services/api';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoading = useSelector(isAuthUserLoadingSelector);
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
    dispatch(userActions.setIsLoading(true));
    const {
      payload: {token, message, errors},
    } = await dispatch(userActions.login(formData));
    if (token) {
    } else if (!token && message) {
      Alert.alert(message);
      dispatch(userActions.setIsLoading(false));
    } else if (errors?.username_password_incorrect?.length > 0) {
      Alert.alert(errors?.username_password_incorrect[0]);
    } else {
      Alert.alert('Signup failed, please try again later.');
      resetForm();
    }
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

  return (
    <ScreenBackground>
      <View style={{padding: 16}}>
        <Text marginBottom={22}>Login Screen</Text>
        <TextInput
          fontSize={16}
          placeholder="Email"
          marginTop={21}
          value={values.email}
          onChangeText={handleChange('email')}
          errorMessage={errors.email}
        />
        <TextInput
          fontSize={16}
          placeholder="Password"
          marginTop={21}
          value={values.password}
          onChangeText={handleChange('password')}
          errorMessage={errors.password}
          secureTextEntry={true}
        />
        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Green}
          shadowColor={COLORS.GreenShadow}
          onPress={handleSubmit}
          title="Login"
          buttonTitleFontSize={16}
          style={{marginTop: 21, marginBottom: 36}}
          disabled={isLoading}
          isLoading={isLoading}
        />
        <TouchableOpacity
          onPress={() => {
            doHapticFeedback();
            navigation.navigate(NAV_ROUTES.signup);
          }}>
          <Text textAlign="center">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScreenBackground>
  );
};

export {LoginScreen};
