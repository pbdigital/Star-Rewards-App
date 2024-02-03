import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {Alert} from 'react-native';
import {useFormik} from 'formik';
import {
  Button,
  ScreenBackground,
  Toolbar,
  EmojiPicker,
  AppTextInput,
} from 'Components';
import {COLORS} from 'Constants';
import {addRewardValidationScheme} from 'FormValidations';
import {Container, Content, Form} from './styles';
import {isEmpty} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {childIdSelector, childActions} from 'Redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NAV_ROUTES} from 'Constants';

const AddRewardScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const {reward} = route.params || {};

  const childId = useSelector(childIdSelector);
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = useMemo(() => !!reward, [reward]);
  const toolbarTitle = useMemo(
    () => (isEditing ? 'Edit Reward' : 'Add A Reward'),
    [isEditing],
  );
  const buttonTitle = useMemo(
    () => (isEditing ? 'Save' : 'Add Reward'),
    [isEditing],
  );

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
        navigation.navigate(NAV_ROUTES.rewards, {
          showAddSuccessNotification: emoji,
        });
      } else {
        Alert.alert('Unable to add rewards. Please try again later.');
      }
    },
    [childId],
  );

  const editReward = useCallback(
    async ({name, starsNeededToUnlock, emoji}) => {
      const {id: rewardId} = reward;
      const payload = {
        name,
        starsNeededToUnlock: parseInt(starsNeededToUnlock, 10),
        emoji,
      };
      setIsLoading(true);
      const {payload: resultPayload} = await dispatch(
        childActions.updateChildRewards({childId, rewardId, payload}),
      );
      setIsLoading(false);
      if (resultPayload?.success) {
        navigation.navigate(NAV_ROUTES.rewards);
      } else {
        Alert.alert('Unable to update rewards. Please try again later.');
      }
    },
    [childId, reward],
  );

  const processForm = useCallback(
    async formData => {
      isEditing ? editReward(formData) : addReward(formData);
    },
    [addReward, editReward, isEditing],
  );

  const {
    handleSubmit,
    handleChange,
    errors,
    setErrors,
    values,
    setValues,
    touched,
  } = useFormik({
    initialValues: {
      name: '',
      starsNeededToUnlock: '',
      emoji: '',
    },
    onSubmit: processForm,
    validationSchema: addRewardValidationScheme,
    validateOnChange: false,
  });

  useEffect(() => {
    if (reward && isEditing) {
      console.log('Edit', {reward});
      const {name, starsNeededToUnlock, emoji} = reward;
      const options = {shouldValidate: false, shouldTouch: false};
      setValues(
        {
          name,
          starsNeededToUnlock,
          emoji,
        },
        options,
      );
    }
  }, [reward, isEditing, setValues]);

  const handleOnInputBoxChanged = () => {
    setErrors({});
  };

  return (
    <ScreenBackground cloudType={0}>
      <Container>
        <Toolbar title={toolbarTitle} />
        <Content>
          <EmojiPicker
            value={values.emoji}
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
              value={values.name}
              placeholder="Enter Reward Name"
            />
            <AppTextInput
              onChangeText={handleChange('starsNeededToUnlock')}
              onChange={handleOnInputBoxChanged}
              label="Star Needed To Redeem"
              marginBottom={20}
              errorMessage={errors.starsNeededToUnlock}
              keyboardType="numeric"
              value={values.starsNeededToUnlock}
            />
          </Form>
          <Button
          borderRadius={16}
          titleColor={COLORS.White}
          buttonColor={COLORS.Green}
          shadowColor={COLORS.GreenShadow}
          onPress={handleSubmit}
          title={buttonTitle}
          buttonTitleFontSize={16}
          disabled={isLoading}
          isLoading={isLoading}
        />
        </Content>
      </Container>
    </ScreenBackground>
  );
};

export {AddRewardScreen};
