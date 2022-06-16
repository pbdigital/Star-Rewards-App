import React from 'react';
import {Alert, View, TouchableOpacity} from 'react-native';
import {useFormik} from 'formik';
import {Button, ScreenBackground, Text, TextInput} from '../../Components';
import {COLORS} from '../../Constants/Colors';
import {LoginSchema} from '../../Validations/FormValidation';
import {useDispatch, useSelector} from 'react-redux';
import {userActions} from '../../Redux/User/UserSlice';
import {NAV_ROUTES} from '../../Constants/Navigations';
import {useNavigation} from '@react-navigation/native';
import {isAuthUserLoadingSelector} from '../../Redux/User/UserSelectors';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoading = useSelector(isAuthUserLoadingSelector);

  const handleOnFormSubmit = async formData => {
    dispatch(userActions.setIsLoading(true));
    const {
      payload: {success, message, errors},
    } = await dispatch(userActions.login(formData));
    if (!success && message) {
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
          onPress={() => navigation.navigate(NAV_ROUTES.signup)}>
          <Text textAlign="center">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScreenBackground>
  );
};

export {LoginScreen};
