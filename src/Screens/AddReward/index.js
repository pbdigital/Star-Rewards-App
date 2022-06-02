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
import {isEmpty} from 'lodash';

const AddRewardScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addReward = payload => {
    console.log({payload});
  };

  const {handleSubmit, handleChange, errors, setErrors, values, touched} =
    useFormik({
      initialValues: {
        name: '',
        starsNeededToUnlock: '',
        emoji: '',
      },
      onSubmit: addReward,
      validationSchema: addRewardValidationScheme,
      validateOnChange: false,
    });

  const handleOnInputBoxChanged = () => {
    setErrors({});
  };

  return (
    <ScreenBackground cloudType={0}>
      <Container>
        <Toolbar title="Add A Reward" />
        <Content>
          <EmojiPicker
            onEmojiSelected={handleChange('emoji')}
            onEmojiChange={emoji => setErrors({})}
            hasError={touched && !isEmpty(errors.emoji)}
          />
          <Form>
            <AppTextInput
              onChangeText={handleChange('name')}
              onChange={handleOnInputBoxChanged}
              label="Reward Name"
              marginBottom={20}
              errorMessage={errors.name}
            />
            <AppTextInput
              onChangeText={handleChange('starsNeededToUnlock')}
              onChange={handleOnInputBoxChanged}
              label="Star Points"
              marginBottom={20}
              errorMessage={errors.starsNeededToUnlock}
              keyboardType="numeric"
            />
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
