import React, {useState} from 'react';
import {useFormik} from 'formik';
import {
  Button,
  ScreenBackground,
  Toolbar,
  EmojiPicker,
  AppTextInput,
} from '../../Components';
import {COLORS} from '../../Constants/Colors';
import {addRewardValidationScheme} from '../../FormValidations/AddRewardFormValidation';
import {Container, Content, Form} from './styles';

const AddRewardScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleOnPressAddReward = () => {};

  const addReward = payload => {
    console.log({payload});
  };

  const {handleSubmit, errors} = useFormik({
    initialValues: {
      name: '',
      starsNeededToUnlock: 0,
      emoji: '1',
    },
    onSubmit: addReward,
    validate: addRewardValidationScheme,
    validateOnChange: false,
  });

  return (
    <ScreenBackground cloudType={0}>
      <Container>
        <Toolbar title="Add A Reward" />
        <Content>
          <EmojiPicker />
          <Form>
            <AppTextInput label="Reward Name" marginBottom={20} errorMessage={errors.name} />
            <AppTextInput label="Star Points" marginBottom={20} errorMessage={errors.starsNeededToUnlock} />
          </Form>
        </Content>
        <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Green}
          shadowColor={COLORS.GreenShadow}
          onPress={handleSubmit}
          title="Add Reward"
          buttonTitleFontSize={16}
          disabled={isLoading}
          isLoading={isLoading}
        />
      </Container>
    </ScreenBackground>
  );
};

export {AddRewardScreen};
