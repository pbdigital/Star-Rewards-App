import React, {useState, useCallback} from 'react';
import {Alert} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import {childIdSelector} from '../../Redux/Child/ChildSelectors';
import {childActions} from '../../Redux/Child/ChildSlice';
import {useNavigation} from '@react-navigation/native';
import {NAV_ROUTES} from '../../Constants/Navigations';

const AddRewardScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const childId = useSelector(childIdSelector);
  const [isLoading, setIsLoading] = useState(false);

  const addReward = useCallback(
    async ({name, starsNeededToUnlock, emoji}) => {
      const payload = {
        name,
        starsNeededToUnlock: parseInt(starsNeededToUnlock, 10),
        emoji,
      };
      setIsLoading(true);
      const {payload: resultPayload} = await dispatch(
        childActions.createChildReward({childId, payload}),
      );
      setIsLoading(false);
      if (resultPayload?.success) {
        navigation.navigate(NAV_ROUTES.rewards);
      } else {
        Alert.alert('Unable to add rewards. Please try again later.');
      }
    },
    [childId],
  );

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
