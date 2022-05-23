import React from 'react';
import {View} from 'react-native';
import {useFormik} from 'formik';
import {Button, ScreenBackground, Text, TextInput} from '../../Components';
import {COLORS} from '../../Constants/Colors';
import {SignUpSchema} from '../../Validations/SignUpScheme';
import {useDispatch} from 'react-redux';
import {userActions} from '../../Redux/User/UserSlice';

const SignupScreen = () => {
  const dispatch = useDispatch();

  const handleOnFormSubmit = formData => {
    dispatch(userActions.signUp(formData));
  };

  const {errors, handleChange, handleSubmit, values, isSubmitting, setErrors} =
    useFormik({
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
          isPassword
        />
        <TextInput
          fontSize={16}
          placeholder="Confirm Password"
          marginTop={21}
          value={values.confirmPassword}
          onChangeText={handleChange('confirmPassword')}
          errorMessage={errors.confirmPassword}
          isPassword
        />
        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Green}
          shadowColor={COLORS.GreenShadow}
          onPress={handleSubmit}
          title="Sign Up"
          buttonTitleFontSize={16}
          disabled={false}
          style={{marginTop: 21}}
        />
      </View>
    </ScreenBackground>
  );
};

export {SignupScreen};
