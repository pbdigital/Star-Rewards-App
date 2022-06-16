import React, {useState} from 'react';
import {View, TouchableOpacity, Alert} from 'react-native';
import {useFormik} from 'formik';
import {Button, ScreenBackground, Text, TextInput} from '../../Components';
import {COLORS} from '../../Constants/Colors';
import {SignUpSchema} from '../../Validations/FormValidation';
import {useDispatch} from 'react-redux';
import {userActions} from '../../Redux/User/UserSlice';
import {useNavigation } from '@react-navigation/native';
import {NAV_ROUTES} from '../../Constants/Navigations';

const SignupScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <ScreenBackground>
      <View style={{padding: 16}}>
        <Text marginBottom={22}>Signup Screen</Text>
        <TextInput
          fontSize={16}
          placeholder="First Name"
          marginTop={21}
          value={values.firstName}
          onChangeText={handleChange('firstName')}
          errorMessage={errors.firstName}
        />
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
        <TextInput
          fontSize={16}
          placeholder="Confirm Password"
          marginTop={21}
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
          style={{marginTop: 21, marginBottom: 36}}
          disabled={isLoading}
          isLoading={isLoading}
        />
        <TouchableOpacity onPress={() => navigation.navigate(NAV_ROUTES.login)}>
          <Text textAlign="center">Login</Text>
        </TouchableOpacity>
      </View>
    </ScreenBackground>
  );
};

export {SignupScreen};
