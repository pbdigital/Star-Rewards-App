import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  Toolbar,
  AppTextInput,
  LoadingIndicator,
  AppAlertModal,
  Text,
} from '../../Components';
import {COLORS} from '../../Constants/Colors';
import {useNavigation} from '@react-navigation/native';
import {userInforSelector} from '../../Redux/User/UserSelectors';
import {Images} from '../../Assets/Images';
import {Image} from './../../Components/Image';
import {SuccessModalContaier, Root, Container, Content, Padded} from './styles';
import {useFormik} from 'formik';
import {firstNameRule} from '../../Validations/FormValidation';
import * as Yup from 'yup';

const MyAccountUpdateNameScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userInfo = useSelector(userInforSelector);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleOnPressSaveButton = formData => {
    console.log({formData});
    setShowSuccessAlert(true);
  };

  const {errors, handleChange, values, handleSubmit} = useFormik({
    initialValues: {
      firstName: userInfo?.firstName,
    },
    validationSchema: Yup.object().shape({
      firstName: firstNameRule,
    }),
    onSubmit: handleOnPressSaveButton,
  });

  return (
    <>
      <Root>
        <Container>
          <Padded>
            <Toolbar title="Update Name" />
          </Padded>
          <Content>
            <AppTextInput
              label="Name"
              onChangeText={handleChange('firstName')}
              value={values.firstName}
              errorMessage={errors.firstName}
            />
          </Content>
          <Padded>
            <Button
              borderRadius={16}
              titleColor={COLORS.White}
              buttonColor={COLORS.Green}
              shadowColor={COLORS.GreenShadow}
              onPress={handleSubmit}
              title="Save"
              buttonTitleFontSize={16}
              disabled={isLoading}
              isLoading={isLoading}
            />
          </Padded>
        </Container>
        {isLoading && <LoadingIndicator />}
      </Root>
      <AppAlertModal
        isVisible={showSuccessAlert}
        onClose={() => setShowSuccessAlert(false)}>
        <SuccessModalContaier>
          <Image source={Images.IcSuccess} width={60} height={60} />
          <Text
            fontSize={20}
            lineHeight={30}
            fontWeight="600"
            textAlign="center"
            marginTop={20}
            color={COLORS.Text.black}>
            Your name was successfully updated.
          </Text>
        </SuccessModalContaier>
      </AppAlertModal>
    </>
  );
};

export {MyAccountUpdateNameScreen};
