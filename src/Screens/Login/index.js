import React from 'react';
import {Alert, View, TouchableOpacity} from 'react-native';
import {useFormik} from 'formik';
import {Button, ScreenBackground, Text, TextInput} from '../../Components';
import {COLORS} from '../../Constants/Colors';
import {LoginSchema} from '../../Validations/FormValidation';
import {useDispatch} from 'react-redux';
import {userActions} from '../../Redux/User/UserSlice';
import {NAV_ROUTES} from '../../Constants/Navigations';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleOnFormSubmit = async formData => {
    const {
      payload: {success, message},
    } = await dispatch(userActions.login(formData));
    if (!success && message) {
      Alert.alert(message);
    }
  };

  const {errors, handleChange, handleSubmit, values, isSubmitting, setErrors} =
    useFormik({
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
          disabled={isSubmitting}
          isLoading={isSubmitting}
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
